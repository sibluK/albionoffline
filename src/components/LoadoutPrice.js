import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/LoadoutPrice.css';
import CityLoadoutPrice from './CityLoadoutPrice.js';

const cities = ['Fort Sterling', 'Lymhurst', 'Thetford', 'Martlock', 'Caerleon', 'Bridgewatch'];

const LoadoutPrice = ({ lockedItems }) => {
    const [prices, setPrices] = useState({});
    const priceCache = useRef({}); // Ref to store cached prices

    useEffect(() => {
        const fetchPrices = async () => {
            const newPrices = {};

            const pricePromises = Object.entries(lockedItems).map(async ([key, item]) => {
                // Check if item is already cached
                if (priceCache.current[item.identifier]) {
                    newPrices[item.identifier] = priceCache.current[item.identifier];
                    return;
                }

                const apiUrl = `https://europe.albion-online-data.com/api/v2/stats/prices/${item.identifier}.json?qualities=1`;

                try {
                    const response = await axios.get(apiUrl);
                    const itemPrices = {};

                    response.data.forEach(priceData => {
                        const city = priceData.city;
                        const sellPriceMin = priceData.sell_price_min || 0;
                        const sellPriceDate = priceData.sell_price_min_date || null;

                        let timeSinceUpdate = 'No current data';

                        if (sellPriceMin > 0 && sellPriceDate !== '0001-01-01T00:00:00') {
                            timeSinceUpdate = calculateTimeSinceUpdate(sellPriceDate);
                        }

                        itemPrices[city] = { sellPriceMin, timeSinceUpdate };
                    });

                    // Update the cache
                    priceCache.current[item.identifier] = itemPrices;
                    newPrices[item.identifier] = itemPrices;
                } catch (error) {
                    console.error(`Error fetching price for ${item.identifier}:`, error);
                }
            });

            await Promise.all(pricePromises);
            setPrices(prevPrices => ({ ...prevPrices, ...newPrices }));
        };

        fetchPrices();
    }, [lockedItems]);

    const calculateTimeSinceUpdate = (dateString) => {
        const currentDate = new Date();
        const priceDate = new Date(dateString);
        const diffInMilliseconds = currentDate - priceDate;
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hour(s) ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} day(s) ago`;
        }
    };

    return (
        <div className='card-container'>
            {cities.map((cityName) => (
                <CityLoadoutPrice
                    key={cityName}
                    cityName={cityName}
                    lockedItems={lockedItems}
                    prices={prices}
                />
            ))}
        </div>
    );
};

export default LoadoutPrice;
