import React, { useState } from 'react';
import aries from './assets/aries.webp';
import taurus from './assets/taurus.webp';
import gemini from './assets/gemini.webp';
import cancer from './assets/cancer.webp';
import leo from './assets/leo.webp';
import virgo from './assets/virgo.webp';
import libra from './assets/libra.webp';
import scorpio from './assets/scorpio.webp';
import sagittarius from './assets/sagittarius.webp';
import capricorn from './assets/capricorn.webp';
import aquarius from './assets/aquarius.webp';
import pisces from './assets/pisces.webp';


const HoroscopeApp = () => {
  const [selectedRashi, setSelectedRashi] = useState('');
  const [horoscopeType, setHoroscopeType] = useState('daily');

  const rashis = [
    { name: 'Aries', value: 'aries', logo: aries },
    { name: 'Taurus', value: 'taurus', logo: taurus },
    { name: 'Gemini', value: 'gemini', logo: gemini },
    { name: 'Cancer', value: 'cancer', logo: cancer },
    { name: 'Leo', value: 'leo', logo: leo },
    { name: 'Virgo', value: 'virgo', logo: virgo },
    { name: 'Libra', value: 'libra', logo: libra},
    { name: 'Scorpio', value: 'scorpio', logo: scorpio },
    { name: 'Sagittarius', value: 'sagittarius', logo: sagittarius },
    { name: 'Capricorn', value: 'capricorn', logo: capricorn },
    { name: 'Aquarius', value: 'aquarius', logo: aquarius },
    { name: 'Pisces', value: 'pisces', logo: pisces },
  ];

  const horoscopes = {
    aries: {
      daily: {
        love: 'Open communication strengthens bonds.',
        money: 'Financial windfalls may come your way.',
        health: 'Take care of your energy levels.',
      },
      monthly: {
        love: 'Focus on personal growth in relationships.',
        money: 'Long-term planning will bring stability.',
        health: 'Consistency in fitness pays off.',
      },
    },
    taurus: {
      daily: {
        love: 'Patience will help resolve conflicts.',
        money: 'Avoid impulsive expenses.',
        health: 'Focus on mental well-being today.',
      },
      monthly: {
        love: 'A new romantic connection might blossom.',
        money: 'Budget for unexpected costs.',
        health: 'Maintain a balanced diet.',
      },
    },
    gemini: {
      daily: {
        love: 'Stay open to new conversations.',
        money: 'Investments might yield returns.',
        health: 'Physical activity will re-energize you.',
      },
      monthly: {
        love: 'Social connections thrive this month.',
        money: 'Savings will support future plans.',
        health: 'Practice mindfulness for mental clarity.',
      },
    },
    cancer: {
      daily: {
        love: 'Emotional understanding is key.',
        money: 'Reassess your budget.',
        health: 'Hydration and rest are vital.',
      },
      monthly: {
        love: 'Family time strengthens relationships.',
        money: 'A stable financial month.',
        health: 'Focus on your emotional health.',
      },
    },
    leo: {
      daily: {
        love: 'Confidence attracts positive energy.',
        money: 'Opportunities for growth arise.',
        health: 'Rest to avoid burnout.',
      },
      monthly: {
        love: 'Passion drives romantic endeavors.',
        money: 'Workplace rewards await.',
        health: 'Regular exercise brings vitality.',
      },
    },
    virgo: {
      daily: {
        love: 'Clarity in communication is essential.',
        money: 'Expenses need careful monitoring.',
        health: 'Focus on self-care routines.',
      },
      monthly: {
        love: 'Deep connections grow stronger.',
        money: 'Plan for long-term goals.',
        health: 'Balanced habits improve health.',
      },
    },
    libra: {
      daily: {
        love: 'Romantic surprises may occur.',
        money: 'Collaborative efforts bring success.',
        health: 'Focus on physical relaxation.',
      },
      monthly: {
        love: 'Harmony defines your relationships.',
        money: 'Shared ventures bring prosperity.',
        health: 'Meditation enhances your wellness.',
      },
    },
    scorpio: {
      daily: {
        love: 'Passion fuels your connections.',
        money: 'Manage investments wisely.',
        health: 'Rejuvenation through rest is vital.',
      },
      monthly: {
        love: 'Intense relationships grow deeper.',
        money: 'New ventures will prove fruitful.',
        health: 'Focus on balanced energy levels.',
      },
    },
    sagittarius: {
      daily: {
        love: 'Adventure awaits in love.',
        money: 'Financial risks may pay off.',
        health: 'Stay active to maintain stamina.',
      },
      monthly: {
        love: 'Exciting opportunities in romance.',
        money: 'Planning ahead benefits investments.',
        health: 'Focus on your mental health.',
      },
    },
    capricorn: {
      daily: {
        love: 'Stability strengthens bonds.',
        money: 'Opportunities for financial security.',
        health: 'Consistency in routines benefits you.',
      },
      monthly: {
        love: 'Long-term relationships grow stronger.',
        money: 'Strategic decisions yield results.',
        health: 'Focus on long-term health goals.',
      },
    },
    aquarius: {
      daily: {
        love: 'Innovative ideas charm your partner.',
        money: 'Unexpected gains may occur.',
        health: 'Hydrate and stay active.',
      },
      monthly: {
        love: 'Creative expressions enhance romance.',
        money: 'Networking boosts income.',
        health: 'Mental agility is your strength.',
      },
    },
    pisces: {
      daily: {
        love: 'Dreamy connections bring joy.',
        money: 'Savings plans come into focus.',
        health: 'Relaxation is key today.',
      },
      monthly: {
        love: 'Imaginative efforts enhance love life.',
        money: 'A financially rewarding month.',
        health: 'Focus on mental peace.',
      },
    },
  };

  const handleRashiChange = (e) => {
    setSelectedRashi(e.target.value);
  };

  const handleHoroscopeTypeChange = (e) => {
    setHoroscopeType(e.target.value);
  };

  const currentHoroscope = selectedRashi
    ? horoscopes[selectedRashi][horoscopeType]
    : null;

  const currentRashi = rashis.find((rashi) => rashi.value === selectedRashi);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Horoscope</h1>
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedRashi}
          onChange={handleRashiChange}
          className="p-2 border rounded"
        >
          <option value="">Select Rashi</option>
          {rashis.map((rashi) => (
            <option key={rashi.value} value={rashi.value}>
              {rashi.name}
            </option>
          ))}
        </select>
        <select
          value={horoscopeType}
          onChange={handleHoroscopeTypeChange}
          className="p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      {currentHoroscope && currentRashi && (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center p-4 bg-gray-100">
            <img
              src={currentRashi.logo}
              alt={`${currentRashi.name} logo`}
              className="w-12 h-12 mr-4"
            />
            <h2 className="text-xl font-semibold">{currentRashi.name}</h2>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">
              {horoscopeType.charAt(0).toUpperCase() + horoscopeType.slice(1)}{' '}
              Horoscope
            </h3>
            <div className="mb-2">
              <strong>Love:</strong> {currentHoroscope.love}
            </div>
            <div className="mb-2">
              <strong>Money:</strong> {currentHoroscope.money}
            </div>
            <div className="mb-2">
              <strong>Health:</strong> {currentHoroscope.health}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoroscopeApp;
