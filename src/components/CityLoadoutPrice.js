import React from 'react';
import '../styles/CityLoadoutPrice.css';

const CityLoadoutPrice = ({ cityName, lockedItems, prices }) => {
    const displayedItemNames = new Set();
    const totalPrice = Object.entries(lockedItems).reduce((acc, [key, item]) => {
        const itemPrice = prices[item.identifier]?.[cityName]?.sellPriceMin || 0;
        return acc + itemPrice;
    }, 0);

    return (
        <div className='city-card'>
            <h2 id='city-name'>{cityName}</h2>
            <div className='item-grid'>
                {Object.entries(lockedItems).map(([key, item]) => {
                     if (!displayedItemNames.has(item.name)) {
                        displayedItemNames.add(item.name);
                        return (
                            <div key={key} className='grid-row'>
                            <span className='row-name'>{item.name}</span>
                            <span className='row-date'>
                                {prices[item.identifier]?.[cityName]?.timeSinceUpdate || 'Loading...'}
                            </span>
                            <span className='row-price'>
                                {prices[item.identifier]?.[cityName]?.sellPriceMin > 0 
                                    ? prices[item.identifier][cityName].sellPriceMin 
                                    : 'No current data'}
                            </span>
                        </div>
                        )
                     }
                     return null;
                })}
            </div>
            <h3>Loadout Price: {totalPrice}</h3>
        </div>
    );
};

export default CityLoadoutPrice;
