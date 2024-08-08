import React from 'react';
import '../styles/CityLoadoutPrice.css';

const CityLoadoutPrice = ({ cityName, lockedItems }) => {
    // Create a Set to keep track of displayed item names
    const displayedItemNames = new Set();

    return (
        <div className='city-card'>
            <h2 id='city-name'>{cityName}</h2>
            <div className='item-grid'>
                { 
                    Object.entries(lockedItems).map(([key, item]) => {
                        // Check if the item name has already been displayed
                        if (!displayedItemNames.has(item.name)) {
                            // If not, add it to the set and display it
                            displayedItemNames.add(item.name);
                            return (
                                <div key={key} className='grid-row'>
                                    <span className='row-name'>{item.name}</span>
                                    <span className='row-date'>{"2024-12-12"}</span>
                                    <span className='row-price'>{"26612"}</span>
                                </div>
                            );
                        }
                        // If it has been displayed, return null to avoid rendering it again
                        return null;
                    })
                }
            </div>
            <h3>Loadout Price: {/* Add calculation for total price here */}</h3>
        </div>
    );
}

export default CityLoadoutPrice;
