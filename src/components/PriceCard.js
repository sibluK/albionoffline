import React from 'react';
import '../styles/PriceCard.css'; 

const PriceCard = ({ itemCount, avgPrice, timestamp }) => {
  return (
    <div className="price-card">
      <h4>Item Count: {itemCount}</h4>
      <p>Average Price: {avgPrice}</p>
      <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};

export default PriceCard;