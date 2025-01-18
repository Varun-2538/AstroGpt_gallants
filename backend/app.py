from flask import Flask, request, jsonify
from flask_cors import CORS
import math
from datetime import datetime, timedelta
import swisseph as swe

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

class VedicKundali:
    def __init__(self):
        self.ayanamsa = swe.SIDM_LAHIRI
        swe.set_sid_mode(self.ayanamsa)
        
        self.planets = {
            swe.SUN: "Sun",
            swe.MOON: "Moon",
            swe.MARS: "Mars",
            swe.MERCURY: "Mercury",
            swe.JUPITER: "Jupiter",
            swe.VENUS: "Venus",
            swe.SATURN: "Saturn",
            swe.MEAN_NODE: "Rahu",  # North Node
        }
        
        self.rashis = [
            "Mesha", "Vrishabha", "Mithuna", "Karka",
            "Simha", "Kanya", "Tula", "Vrishchika",
            "Dhanu", "Makara", "Kumbha", "Meena"
        ]
        
        self.house_significations = {
            1: "Personality, Physical body",
            2: "Wealth, Family, Speech",
            3: "Siblings, Courage, Communication",
            4: "Mother, Home, Emotions",
            5: "Children, Intelligence, Creative pursuits",
            6: "Enemies, Diseases, Debts",
            7: "Marriage, Partnership, Business",
            8: "Longevity, Obstacles, Hidden things",
            9: "Fortune, Higher learning, Dharma",
            10: "Career, Status, Authority",
            11: "Gains, Income, Aspirations",
            12: "Losses, Liberation, Foreign lands"
        }

    def calculate_julian_day(self, date, time_, tz_offset=5.5):
        dt_local = datetime.combine(date, time_)
        delta = timedelta(hours=int(tz_offset), minutes=int((tz_offset % 1) * 60))
        dt_utc = dt_local - delta
        jd = swe.julday(
            dt_utc.year,
            dt_utc.month,
            dt_utc.day,
            dt_utc.hour + dt_utc.minute / 60.0 + dt_utc.second / 3600.0
        )
        return jd

    def get_planet_position(self, julian_day, planet_id):
        planet_calc, _ = swe.calc_ut(julian_day, planet_id, swe.FLG_SIDEREAL)
        longitude = planet_calc[0]
        rashi_index = int(longitude // 30)
        degrees = longitude % 30
        return {
            "longitude": longitude,
            "rashi": self.rashis[rashi_index],
            "degrees": degrees,
            "rashi_number": rashi_index + 1
        }

    def calculate_ascendant(self, julian_day, latitude, longitude):
        swe.set_topo(latitude, longitude, 0)
        houses_data = swe.houses_ex(julian_day, latitude, longitude, b'P')
        ascendant = houses_data[1][0]
        ayanamsa = swe.get_ayanamsa_ut(julian_day)
        ascendant = (ascendant - ayanamsa) % 360
        rashi = int(ascendant / 30)
        degrees = ascendant % 30
        return {
            "longitude": ascendant,
            "rashi": self.rashis[rashi],
            "degrees": degrees,
            "rashi_number": rashi + 1
        }

    def find_house(self, planet_longitude, ascendant_longitude):
        distance = (planet_longitude - ascendant_longitude) % 360
        house = int(distance // 30) + 1
        return house

    def determine_house_positions(self, planets_dict, ascendant):
        asc_long = ascendant["longitude"]
        house_positions = {}
        for planet, data in planets_dict.items():
            pl_long = data["longitude"]
            house_positions[planet] = self.find_house(pl_long, asc_long)
        return house_positions

    def generate_complete_kundali(self, birth_date, birth_time, latitude, longitude, tz_offset=5.5):
        julian_day = self.calculate_julian_day(birth_date, birth_time, tz_offset)
        ascendant = self.calculate_ascendant(julian_day, latitude, longitude)
        planet_positions = {name: self.get_planet_position(julian_day, pid) for pid, name in self.planets.items()}

        # Add Ketu (180° opposite to Rahu)
        rahu_long = planet_positions["Rahu"]["longitude"]
        ketu_long = (rahu_long + 180) % 360
        ketu_rashi_index = int(ketu_long // 30)
        planet_positions["Ketu"] = {
            "longitude": ketu_long,
            "rashi": self.rashis[ketu_rashi_index],
            "degrees": ketu_long % 30,
            "rashi_number": ketu_rashi_index + 1
        }

        planet_house_positions = self.determine_house_positions(planet_positions, ascendant)

        # Calculate Rashi for each house
        house_rashis = {}
        for house in range(1, 13):
            house_longitude = (ascendant["longitude"] + (house - 1) * 30) % 360
            rashi_index = int(house_longitude // 30)
            house_rashis[house] = self.rashis[rashi_index]

        kundali = {
            "birth_details": {
                "date": birth_date.strftime("%Y-%m-%d"),
                "time": birth_time.strftime("%H:%M:%S"),
                "latitude": latitude,
                "longitude": longitude,
                "tz_offset": tz_offset
            },
            "ascendant": ascendant,
            "planets": planet_positions,
            "planet_house_positions": {
                planet: {
                    "house": house,
                    "significance": self.house_significations[house]
                } for planet, house in planet_house_positions.items()
            },
            "house_rashis": house_rashis  # Include Rashi names for all houses
        }
        return kundali


@app.route("/", methods=["POST"])
def calculate_kundali():
    try:
        data = request.json
        name = data.get("name")
        date_of_birth = datetime.strptime(data.get("dateOfBirth"), "%Y-%m-%d").date()
        time_of_birth_str = data.get("timeOfBirth")
        
        # Handle time format (HH:MM or HH:MM:SS)
        if len(time_of_birth_str) == 5:  # HH:MM
            time_of_birth = datetime.strptime(time_of_birth_str, "%H:%M").time()
        elif len(time_of_birth_str) == 8:  # HH:MM:SS
            time_of_birth = datetime.strptime(time_of_birth_str, "%H:%M:%S").time()
        else:
            return jsonify({"error": "Invalid time format. Use HH:MM or HH:MM:SS"}), 400

        latitude = float(data.get("latitude"))
        longitude = float(data.get("longitude"))
        tz_offset = 5.5

        calculator = VedicKundali()
        kundali = calculator.generate_complete_kundali(date_of_birth, time_of_birth, latitude, longitude, tz_offset)

        return jsonify({
            "name": name,
            "kundali": kundali
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
