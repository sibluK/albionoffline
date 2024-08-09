import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/CityLoadoutPrice.css';

const CityLoadoutPrice = ({ cityName, lockedItems }) => {
    const [itemPrices, setItemPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const displayedItemNames = new Set();
    const priceCache = useRef({}); // Cache to store prices

    useEffect(() => {
        let isMounted = true; // Track if the component is still mounted
        let newTotalPrice = 0; // Initialize the total price for this update cycle

        const fetchAllPrices = async () => {
            const pricePromises = Object.entries(lockedItems).map(async ([key, item]) => {
                const cacheKey = `${item.identifier}-${cityName}`; // Create a unique cache key

                // Check if the price is already in the cache
                if (priceCache.current[cacheKey]) {
                    const cachedPrice = priceCache.current[cacheKey];
                    newTotalPrice += cachedPrice.sellPriceMin;
                    if (isMounted) {
                        setItemPrices(prevPrices => ({
                            ...prevPrices,
                            [item.identifier]: cachedPrice,
                        }));
                    }
                    return;
                }

                const apiUrl = `https://europe.albion-online-data.com/api/v2/stats/prices/${item.identifier}.json?locations=${cityName}&qualities=1`;

                try {
                    const response = await axios.get(apiUrl);
                    const priceData = response.data[0] || {}; // Handle case where no data is returned
                    const sellPriceMin = priceData.sell_price_min || 0;
                    const sellPriceDate = priceData.sell_price_min_date || null;

                    let timeSinceUpdate = 'No current data'; // Default message for no data

                    // Check if price data is valid
                    if (sellPriceMin > 0 && sellPriceDate !== '0001-01-01T00:00:00') {
                        timeSinceUpdate = calculateTimeSinceUpdate(sellPriceDate);
                        newTotalPrice += sellPriceMin; // Accumulate the total price only if the price is valid
                    }

                    const priceInfo = { sellPriceMin, timeSinceUpdate };
                    priceCache.current[cacheKey] = priceInfo; // Store the fetched price in the cache

                    if (isMounted) {
                        setItemPrices(prevPrices => ({
                            ...prevPrices,
                            [item.identifier]: priceInfo,
                        }));
                    }
                } catch (error) {
                    console.error(`Error fetching price for ${item.identifier}:`, error);
                }
            });

            await Promise.all(pricePromises); // Wait for all price fetches to complete
            if (isMounted) {
                setTotalPrice(newTotalPrice); // Update the total price once all items are processed
            }
        };

        fetchAllPrices();

        return () => {
            isMounted = false; // Cleanup if the component is unmounted
        };
    }, [lockedItems, cityName]); // Rerun the effect when lockedItems or cityName changes

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
                                    {itemPrices[item.identifier]?.timeSinceUpdate || 'Loading...'}
                                </span>
                                <span className='row-price'>
                                    {itemPrices[item.identifier]?.sellPriceMin > 0 
                                        ? itemPrices[item.identifier].sellPriceMin 
                                        : 'No current data'}
                                </span>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <h3>Loadout Price: {totalPrice}</h3>
        </div>
    );
}

export default CityLoadoutPrice;
