import React, { useState, useEffect } from 'react';
import '../styles/PriceCheckWindow.css';
import axios from 'axios';
import PriceCard from './PriceCard';


function PriceCheckWindow() {
  const [itemId, setItemId] = useState('');
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);
  const [quality, setQuality] = useState(1);
  const [city, setCity] = useState('lymhurst');

  const handleInputChange = (e) => {
    setItemId(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkPrice();
    }
  };

  const handleQualityChange = (e) => {
    setQuality(Number(e.target.value));
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  

  const checkPrice = () => {
    const priceUrl = `https://europe.albion-online-data.com/api/v2/stats/history/${itemId}.json?time-scale=1&locations=${city}&qualities=${quality}`

    axios.get(priceUrl)
      .then(response => {
        const processedData = response.data.map(item => ({
          ...item,
          data: item.data.reverse().slice(0, 10)
        }));
        setPrices(processedData);
      })
      .catch(error => {
        setError(error);
      });
  };

  useEffect(() => {
    if (itemId) {
      checkPrice();
    }
  }, [itemId, quality, city]);

  return (
    <div className='price-check-wrapper'>
      <div className='item-filters-wrapper'>
        <input
          id='item-id-input'
          placeholder='Item ID'
          value={itemId}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <select name="qualities" id="qualities" value={quality} onChange={handleQualityChange}>
          <option value="1">Normal</option>
          <option value="2">Good</option>
          <option value="3">Outstanding</option>
          <option value="4t">Excellent</option>
          <option value="5">Masterpiece</option>
        </select>
        <select name="cities" id="cities" value={city} onChange={handleCityChange}>
          <option value="Lymhurst">Lymhurst</option>
          <option value="Fort-sterling">Fort Sterling</option>
          <option value="Thetford">Thetford</option>
          <option value="Bridgewatch">Bridgewatch</option>
          <option value="Martlock">Martlock</option>
          <option value="Caerleon">Caerleon</option>
          <option value="Brecilien">Brecilien</option>
        </select>


      </div>

      <div className='price-display-wrapper'>
        {error ? (<div>Error: {error.message}</div>) : prices.length === 0 ? (<div>No prices available</div>) : (prices.map((priceEntry, index) => (
          <div key={index} className='price-entry'>
            {priceEntry.data.map((priceData, idx) => (
                <PriceCard
                  key={idx}
                  itemCount={priceData.item_count}
                  avgPrice={priceData.avg_price}
                  timestamp={priceData.timestamp}
                />
              ))}
          </div>
        )))}
      </div>
    </div>
  );
}

export default PriceCheckWindow;