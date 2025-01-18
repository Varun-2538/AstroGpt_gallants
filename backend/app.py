import math
from datetime import datetime, time, timedelta
import swisseph as swe
 
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
 
    def calculate_julian_day(self, date, time_, tz_offset=5.9):
        """
        Calculate Julian Day number from local date/time by converting to UT.
        tz_offset is +5.5 for India (UTC+5:30). Adjust if needed.
        """
        # Combine date and time
        dt_local = datetime.combine(date, time_)
        
        # Convert local time to UTC by subtracting tz_offset
        # e.g. 17:55 local minus 5:30 => 12:25 UTC
        
        # hours = int(tz_offset)
        # minutes = int((tz_offset - hours) * 60)
        delta = timedelta(hours=int(tz_offset), minutes=int((tz_offset % 1) * 60))
        dt_utc = dt_local - delta
        
        # Now get the Julian day in UT
        jd = swe.julday(
            dt_utc.year,
            dt_utc.month,
            dt_utc.day,
            dt_utc.hour + dt_utc.minute/60.0 + dt_utc.second/3600.0
        )
        return jd
 
    def get_planet_position(self, julian_day, planet_id):
        """Calculate planet's sidereal position using Lahiri ayanamsa."""
        # sidereal calculation
        planet_calc, _ = swe.calc_ut(julian_day, planet_id, swe.FLG_SIDEREAL)
        longitude = planet_calc[0]
        
        # Compute rashi (sign) and degrees
        rashi_index = int(longitude // 30)
        degrees = longitude % 30
        
        return {
            "longitude": longitude,
            "rashi": self.rashis[rashi_index],
            "degrees": degrees,
            "rashi_number": rashi_index + 1
        }
 
    def calculate_ascendant(self, julian_day, latitude, longitude):
        """Calculate Lagna (Ascendant) for given time and location"""
    # Set geographical location
        swe.set_topo(latitude, longitude, 0)
    
    # Calculate ascendant in tropical zodiac
    # 'P' needs to be encoded to bytes for the houses_ex function
        houses_data = swe.houses_ex(julian_day, latitude, longitude, b'P')
        ascendant = houses_data[1][0]
    
    # Get ayanamsa value
        ayanamsa = swe.get_ayanamsa_ut(julian_day)
    
    # Convert to sidereal by subtracting ayanamsa
        ascendant = ascendant - ayanamsa
    
    # Normalize to 0-360 range
        ascendant = ascendant % 360
    
        rashi = int(ascendant / 30)
        degrees = ascendant % 30
    
        return {
            "longitude": ascendant,
            "rashi": self.rashis[rashi],
            "degrees": degrees,
            "rashi_number": rashi + 1
        }
 
    def find_house(self, planet_longitude, ascendant_longitude):
        """Find the house of a planet, given its sidereal longitude and the sidereal Asc."""
        # The difference from ascendant
        distance = (planet_longitude - ascendant_longitude) % 360
        
        # Each 30 degrees is one house, counting from Asc=House 1
        house = int(distance // 30) + 1  # 1 to 12
        if house > 12:
            house -= 12
        return house
 
    def determine_house_positions(self, planets_dict, ascendant):
        """
        Return a dict: { 'Sun': 7, 'Moon': 4, ... }
        showing each planet’s house (1..12).
        """
        asc_long = ascendant["longitude"]
        house_positions = {}
        
        for planet, data in planets_dict.items():
            pl_long = data["longitude"]
            house_positions[planet] = self.find_house(pl_long, asc_long)
        
        return house_positions
 
    def generate_complete_kundali(self, birth_date, birth_time, latitude, longitude, tz_offset=5.9):
        """Generate a full Kundali given local birth details & time zone offset."""
        # 1) Convert local time -> UT, get JD
        julian_day = self.calculate_julian_day(birth_date, birth_time, tz_offset)
        
        # 2) Ascendant
        ascendant = self.calculate_ascendant(julian_day, latitude, longitude)
        
        # 3) Planets
        planet_positions = {}
        for pid, pname in self.planets.items():
            planet_positions[pname] = self.get_planet_position(julian_day, pid)
        
        # 4) Ketu (always 180° from Rahu)
        rahu_long = planet_positions["Rahu"]["longitude"]
        ketu_long = (rahu_long + 180) % 360
        ketu_rashi_index = int(ketu_long // 30)
        planet_positions["Ketu"] = {
            "longitude": ketu_long,
            "rashi": self.rashis[ketu_rashi_index],
            "degrees": ketu_long % 30,
            "rashi_number": ketu_rashi_index + 1
        }
        
        # 5) House positions
        planet_house_positions = self.determine_house_positions(planet_positions, ascendant)
        
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
            "planet_house_positions": planet_house_positions
        }
        
        return kundali
 
#
# Example usage
#
if __name__ == "__main__":
    calculator = VedicKundali()
    
    # Example: 2003-03-25, local time = 17:55, location ~ India
    # latitude, longitude, and time zone offset
    birth_date = datetime(2004, 4, 11).date() #in the format of yyyy/mm/dd
    birth_time = time(17, 12, 0)
    latitude = 28.4089
    longitude = 77.3178
    tz_offset = 5.9  # UTC+5:30 for India Standard Time
    
    kundali = calculator.generate_complete_kundali(birth_date, birth_time, latitude, longitude, tz_offset)
    
    print("\n=== Birth Details ===")
    for k, v in kundali["birth_details"].items():
        print(f"{k}: {v}")
    
    print("\n=== Ascendant (Lagna) ===")
    asc = kundali["ascendant"]
    print(f"Lagna: {asc['rashi']} ({asc['degrees']:.2f}°)")
    
    print("\n=== Planetary Positions ===")
    for planet, pos in kundali["planets"].items():
        print(f"{planet}: {pos['rashi']} ({pos['degrees']:.2f}°)")
    
    print("\n=== Planets in Houses ===")
    for planet, house_num in kundali["planet_house_positions"].items():
        print(f"{planet} is in House {house_num}")
        print(f"House {house_num} signifies: {calculator.house_significations[house_num]}")