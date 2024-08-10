import React from 'react';
import '../styles/CityLoadoutPrice.css';


const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
};

const cityColors = {
    'Fort Sterling': '#000000',  
    'Lymhurst': '#b5e617',       
    'Thetford': '#a546a5',      
    'Martlock': '#00a2e8',        
    'Caerleon': '#e72944',       
    'Bridgewatch': '#ffca06'      
};

const CityLoadoutPrice = ({ cityName, lockedItems, prices }) => {
    const displayedItemNames = new Set();
    const totalPrice = Object.entries(lockedItems).reduce((acc, [key, item]) => {
        const itemPrice = prices[item.identifier]?.[cityName]?.sellPriceMin || 0;
        return acc + itemPrice;
    }, 0);

    const cityColor = cityColors[cityName] || '#000000';

    return (
        <div className='city-card'>
            <h2 id='city-name' style={{ color: cityColor }}>{cityName}</h2>
            <div className='item-grid'>
                <span className='column-item-name' style={{ fontWeight: '700'}}>Item Name</span>
                <span className='column-item-date' style={{ fontWeight: '700'}}>Last Update</span>
                <span className='column-item-price' style={{ fontWeight: '700'}}>Price</span>
                {Object.entries(lockedItems).map(([key, item]) => {
                     if (!displayedItemNames.has(item.name)) {
                        displayedItemNames.add(item.name);
                        const itemPrice = prices[item.identifier]?.[cityName]?.sellPriceMin || 0;
                        return (
                            <div key={key} className='grid-row'>
                                <span className='row-name'>{item.name}</span>
                                <span className='row-date'>
                                    {prices[item.identifier]?.[cityName]?.timeSinceUpdate || 'Loading...'}
                                </span>
                                <span className='row-price'>
                                    {itemPrice > 0 ? formatNumber(itemPrice) : 'No current data'}
                                </span>
                            </div>
                        )
                     }
                     return null;
                })}
            </div>
            <h3>Loadout Price: {formatNumber(totalPrice)}</h3>
        </div>
    );
};

export default CityLoadoutPrice;
