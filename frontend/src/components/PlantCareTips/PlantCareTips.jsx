import React from 'react';
import './PlantCareTips.css'; // Import CSS for styling
import { assets } from '../../assets/assets'; // Ensure images are correctly referenced

const PlantCareTips = () => {
  const tips = [
    {
      title: "Watering",
      content: "Water your plants according to their specific needs. Most indoor plants need to be watered once a week. Make sure the soil is dry before the next watering.",
      image: assets.wateringImage // Include image reference here
    },
    {
      title: "Lighting",
      content: "Place your plants in locations where they can get the right amount of light. Some plants prefer indirect sunlight, while others thrive in direct sunlight.",
      image: assets.lightingImage
    },
    {
      title: "Humidity",
      content: "Many indoor plants love humidity. Mist the leaves with water, especially during the dry winter months, to keep the humidity levels high.",
      image: assets.humidityImage
    },
    {
      title: "Fertilizing",
      content: "Use organic fertilizers once every few weeks during the growing season to help your plants thrive. Avoid over-fertilizing, as it can harm the roots.",
      image: assets.fertilizingImage
    },
    {
      title: "Pruning",
      content: "Remove dead or yellowing leaves to encourage new growth and keep the plant healthy. Regular pruning also helps maintain the plant’s shape.",
      image: assets.pruningImage
    },
    {
      title: "Pest Control",
      content: "Keep an eye out for pests like aphids and spider mites. Use natural insecticidal soap to treat infestations and avoid chemical pesticides.",
      image: assets.pestControlImage
    }
  ];

  return (
    <div className="plant-care-tips">
      <div className="header-image">
      <img src={assets.water} alt="water" />
      </div>
      <h2>Plant Care Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>
            {tip.image && <img src={tip.image} alt={tip.title} />} {/* Render image */}
            <div>
              <h3>{tip.title}</h3>
              <p>{tip.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantCareTips;
