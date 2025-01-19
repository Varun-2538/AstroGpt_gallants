# Kundali Analysis and Remedies using AI and Swiss Ephemeris

## 🚀 Project Overview

This project is a comprehensive solution to generate and analyze a **Kundali (horoscope)** using **Swiss Ephemeris** for precise astronomical calculations and **React** with **Vite** for an interactive and dynamic frontend experience. The application provides detailed insights into astrological aspects such as **planetary placements**, **houses**, **Rashis (zodiac signs)**, and the **Vimshottari Dasha** system. Additionally, it incorporates **AI-driven contextual analysis** to generate actionable insights and remedies.

---

## 🌟 Key Features

### 🔭 Kundali Generation
- **Swiss Ephemeris**: Used for generating accurate planetary positions, Rashis, and Vimshottari Dasha.
- **House Analysis**: Calculates planetary placements for all 12 houses, along with their status (Exalted, Debilitated, or Neutral).

### 🛠️ AI-Driven Astrological Analysis
- Contextual prompts to provide detailed astrological insights:
  - **House-by-House Analysis**: Includes sitting planets, their effects (positive and negative), and remedies.
  - **Exalted and Debilitated Planets**: Identifies and highlights their influence on the native’s life.
  - **Personalized Recommendations**: Suggests gemstones, rituals, poojas, mantra jap, and lifestyle changes for planetary imbalances.

### 📚 JSON-Based Knowledge Base
- Uploaded multiple JSON files covering:
  - **Rashis**: Characteristics of all zodiac signs.
  - **Planets**: Nature, effects, and attributes of all planets.
  - **Houses**: Details of all 12 houses and their significations.
  - **Numerology**: Insights based on numbers and their astrological significance.
  - **Remedies**: Practical and spiritual remedies for negatively placed planets.

### 🌐 Frontend Features
- **React + Vite**: High-performance frontend framework to ensure a smooth and responsive user experience.
- **Interactive UI**: Provides an intuitive way to input birth details and view the generated Kundali along with the analysis.

---

## 🧠 AI-Powered Context and Prompt System

The project leverages an advanced prompt-based AI system to perform astrological analysis. Here's how it works:

### 📋 Context
The AI takes birth details, planetary placements, and house information to analyze the Kundali based on the following format:
- **House Analysis**:
  - Sitting Planet, Rashi, Status (Exalted/Debilitated/Neutral).
  - Positive and Negative Effects of each planet and house lord.
  - Remedies: Gemstones, rituals, mantras, lifestyle changes.
- **Impact and Recommendations**:
  - Practical and spiritual remedies to harmonize planetary influences.
  - Suggestions to maximize positive effects of exalted or strong benefics.
- **Summary**:
  - Overview of favorable and challenging influences.
  - Actionable guidance to balance the Kundali and optimize life experiences.

### 📖 Sample AI Question and Answer
**Question**: Based on my birth details and astrological data, identify all exalted and debilitated planets, analyze the positive and negative effects of planets in each house brutally honestly, and provide remedies, gemstones, rituals, and lifestyle changes for any challenges identified.

**Answer**: (Generated dynamically using AI based on the input data and context.)

---

## 🛠️ Technologies Used

### Backend
- **Swiss Ephemeris**: For accurate astronomical calculations.
- **Flask**: Backend framework for APIs to communicate with the frontend.
- **Python**: Logic for handling ephemeris data and generating Kundali.

### Frontend
- **React**: Component-based architecture for building a dynamic user interface.
- **Vite**: Fast development and build tool for a modern frontend.

### AI Integration
- **Prompt-Based AI Analysis**: Generates personalized insights and remedies based on astrological data.

### Data Management
- **JSON Files**: Comprehensive data for planets, Rashis, houses, numerology, and remedies.

---

## 🎯 How It Works

1. **User Input**:
   - The user provides their birth details (date, time, and place) through the frontend.

2. **Kundali Generation**:
   - Swiss Ephemeris calculates planetary positions, Rashis, and houses based on the input.

3. **AI-Driven Analysis**:
   - The contextual AI performs house-by-house analysis and generates actionable insights, including remedies and lifestyle changes.

4. **Frontend Display**:
   - The Kundali and analysis are displayed interactively using React, with options to explore Vimshottari Dasha, remedies, and more.

---

## 🧑‍💻 Getting Started

### Prerequisites
- **Node.js** and **npm** for frontend.
- **Python** for backend and Swiss Ephemeris integration.
- **Swiss Ephemeris Library** installed.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/kundali-analysis.git
   cd kundali-analysis
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     pip install flask flask-cors swisseph
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Run the Project**:
   - Backend:
     ```bash
     python app.py
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

---

## 📂 Project Structure

```
kundali-analysis/
├── backend/
│   ├── app.py               # Flask backend
│   ├── utils/               # Utility functions for calculations
│   └── data/                # JSON files for planets, houses, remedies, etc.
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── assets/          # Static assets
│   │   └── App.jsx          # Main React app
│   └── vite.config.js       # Vite configuration
└── README.md                # Project documentation
```

---

## ✨ Features to Add in Future
- **Transit Analysis**: Dynamic analysis based on current planetary transits.
- **Compatibility Matching**: Kundali matching for relationships.
- **Multilingual Support**: Generate analysis in multiple languages.

---

## 📝 License
This project is licensed under the MIT License.

---

## 📧 Contact
For questions or suggestions, reach out to:
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

Enjoy exploring the stars! 🌟
