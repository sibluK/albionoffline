import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Inventory.css';

function Inventory() {
  const [fetchedData, setFetchedData] = useState({});
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const selectRandomItem = (items) => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      return items[randomIndex];
    }
    return null;
  };

  const reroll = (data) => {
    setLoading(true);
    setTimeout(() => {
      const newItems = {};
      for (const [key, items] of Object.entries(data)) {
        newItems[key] = selectRandomItem(items);
      }
      setItems(newItems);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = {
          bag: [`https://api.openalbion.com/api/v3/accessories?category_id=36`],
          head: [
            `https://api.openalbion.com/api/v3/armors?subcategory_id=25`,
            `https://api.openalbion.com/api/v3/armors?subcategory_id=33`,
            `https://api.openalbion.com/api/v3/armors?subcategory_id=29`
          ],
          cape: [`https://api.openalbion.com/api/v3/accessories?category_id=35`],
          mainHand: [`https://api.openalbion.com/api/v3/weapons`],
          body: [
            `https://api.openalbion.com/api/v3/armors?subcategory_id=32`,
            `https://api.openalbion.com/api/v3/armors?subcategory_id=28`,
            `https://api.openalbion.com/api/v3/armors?subcategory_id=24`
          ],
          offHand: [
            `https://api.openalbion.com/api/v3/weapons?subcategory_id=15`,
            `https://api.openalbion.com/api/v3/weapons?subcategory_id=22`,
            `https://api.openalbion.com/api/v3/weapons?subcategory_id=8`
          ],
          potion: [`https://api.openalbion.com/api/v3/consumables?category_id=60`],
          feet: [
            `https://api.openalbion.com/api/v3/armors?subcategory_id=30`,
            `https://api.openalbion.com/api/v3/armors?subcategory_id=34`,
            `https://api.openalbion.com/api/v3/armors?subcategory_id=26`
          ],
          food: [`https://api.openalbion.com/api/v3/consumables?category_id=52`],
          mount: [`https://api.openalbion.com/api/v3/accessories?category_id=40`],
        };

        const fetchFromEndpoints = async (urls) => {
          const responses = await Promise.all(urls.map(url => axios.get(url)));
          return responses.flatMap(response => response.data.data);
        };

        const fetchedData = await Promise.all(
          Object.entries(endpoints).map(async ([key, urls]) => {
            const data = await fetchFromEndpoints(urls);
            return { [key]: data };
          })
        );

        const combinedData = fetchedData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

        setFetchedData(combinedData);
        reroll(combinedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className='loadout-wrapper'>
        <div className='loadout-item' id='item-bag'>
          {items.bag && <img src={items.bag.icon} alt={items.bag.name} />}
        </div>
        <div className='loadout-item' id='item-head'>
          {items.head && <img src={items.head.icon} alt={items.head.name} />}
        </div>
        <div className='loadout-item' id='item-cape'>
          {items.cape && <img src={items.cape.icon} alt={items.cape.name} />}
        </div>
        <div className='loadout-item' id='item-main-hand'>
          {items.mainHand && <img src={items.mainHand.icon} alt={items.mainHand.name} />}
        </div>
        <div className='loadout-item' id='item-body'>
          {items.body && <img src={items.body.icon} alt={items.body.name} />}
        </div>
        <div className='loadout-item' id='item-off-hand'>
          {items.offHand && <img src={items.offHand.icon} alt={items.offHand.name} />}
        </div>
        <div className='loadout-item' id='item-potion'>
          {items.potion && <img src={items.potion.icon} alt={items.potion.name} />}
        </div>
        <div className='loadout-item' id='item-feet'>
          {items.feet && <img src={items.feet.icon} alt={items.feet.name} />}
        </div>
        <div className='loadout-item' id='item-food'>
          {items.food && <img src={items.food.icon} alt={items.food.name} />}
        </div>
        <div className='loadout-item' id='item-mount'>
          {items.mount && <img src={items.mount.icon} alt={items.mount.name} />}
        </div>
      </div>

      <div className='button-wrapper'>
            <button className='button' id='reroll-button'  onClick={() => reroll(fetchedData)}>Reroll</button>
        </div>
    </>
  );
}

export default Inventory;
