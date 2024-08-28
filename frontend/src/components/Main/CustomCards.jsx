import React from 'react';
import { useContext } from 'react';
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";

const CardSelector = ({ handleCardClick, selectedCard }) => {
  return (
    <div className="cards">
      <div
        className={`card ${selectedCard === "Can we mask production Database?" ? "active" : ""}`}
        onClick={() => handleCardClick("Can we mask production Database?")}
      >
        <p>Can we mask production Database?</p>
        <img src={assets.compass_icon} alt="card" />
      </div>
      <div
        className={`card ${selectedCard === "Is masking reversible?" ? "active" : ""}`}
        onClick={() => handleCardClick("Is masking reversible?")}
      >
        <p>Is masking reversible?</p>
        <img src={assets.bulb_icon} alt="card" />
      </div>
      <div
        className={`card ${selectedCard === "What is the minimum table space needed to mask data?" ? "active" : ""}`}
        onClick={() => handleCardClick("What is the minimum table space needed to mask data?")}
      >
        <p>What is the minimum table space needed to mask data?</p>
        <img src={assets.message_icon} alt="card" />
      </div>
      <div
        className={`card ${selectedCard === "Can you share a sample masking report?" ? "active" : ""}`}
        onClick={() => handleCardClick("Can you share a sample masking report?")}
      >
        <p>Can you share a sample masking report?</p>
        <img src={assets.code_icon} alt="card" />
      </div>
    </div>
  );
};

export default CardSelector;
