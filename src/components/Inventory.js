import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Inventory.css';
import LoadoutPrice from './LoadoutPrice.js';

function Inventory() {
  const [fetchedData, setFetchedData] = useState({});
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lockedItems, setLockedItems] = useState({});
  const [tooltip, setTooltip] = useState({ visible: false, content: {}, x: 0, y: 0 });

  const selectRandomItem = (items) => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      return items[randomIndex];
    }
    return null;
  };

  const isTwoHandedWeapon = (item) => {
    return item.identifier.includes('_2H_');
  };

  const reroll = (data) => {
    setTimeout(() => {
      const newItems = {};
  
      let mainHandItem;
      if (lockedItems.mainHand) {
        mainHandItem = lockedItems.mainHand;
      } else if (lockedItems.offHand) {
        // Filter main hand items based on the criteria
        const filteredMainHandItems = data.mainHand.filter(item =>
          !isTwoHandedWeapon(item) &&
          !item.identifier.includes('_OFF_') &&
          !item.identifier.includes('Tome of Spells') &&
          !item.identifier.includes('Torch') &&
          !item.identifier.includes('Diary')
        );
        mainHandItem = selectRandomItem(filteredMainHandItems);
      } else {
        // Default filtering for main hand
        const filteredMainHandItems = data.mainHand.filter(item =>
          !item.identifier.includes('_OFF_') &&
          !item.identifier.includes('Tome of Spells') &&
          !item.identifier.includes('Torch') &&
          !item.identifier.includes('Diary')
        );
        mainHandItem = selectRandomItem(filteredMainHandItems);
      }
  
      newItems.mainHand = mainHandItem;
  
      if (isTwoHandedWeapon(mainHandItem)) {
        newItems.offHand = lockedItems.offHand || mainHandItem;
      } else {
        newItems.offHand = lockedItems.offHand || selectRandomItem(data.offHand);
      }
  
      // Handle other items
      for (const key of Object.keys(data)) {
        if (key !== 'mainHand' && key !== 'offHand') {
          newItems[key] = lockedItems[key] || selectRandomItem(data[key]);
        }
      }
  
      setItems(newItems);
      setLoading(false);
    }, 500);
  };

  const refresh = () => {
    Object.keys(lockedItems).forEach(key => {
      delete lockedItems[key];
    });
    setLockedItems({ ...lockedItems });
  };
  
  const toggleLockItem = (key) => {
    setLockedItems((prevLockedItems) => {
      const newLockedItems = { ...prevLockedItems };

      if (key === 'mainHand' || (key === 'offHand' && isTwoHandedWeapon(items.mainHand))) {
        if (newLockedItems.mainHand) {
          delete newLockedItems.mainHand;
          if (isTwoHandedWeapon(items.mainHand)) {
            delete newLockedItems.offHand;
          }
        } else {
          newLockedItems.mainHand = items.mainHand;
          if (isTwoHandedWeapon(items.mainHand)) {
            newLockedItems.offHand = items.mainHand;
          }
        }
      } else if (key === 'offHand') {
        if (!isTwoHandedWeapon(items.mainHand)) {
          if (newLockedItems.offHand) {
            delete newLockedItems.offHand;
          } else {
            newLockedItems.offHand = items.offHand;
          }
        }
      } else {
        if (newLockedItems[key]) {
          delete newLockedItems[key];
        } else {
          newLockedItems[key] = items[key];
        }
      }

      return newLockedItems;
    });
  };
  
  

  const showTooltip = (event, item) => {
    setTooltip({
      visible: true,
      content: item,
      x: event.clientX,
      y: event.clientY
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const updateTooltipPosition = (event) => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      x: event.clientX,
      y: event.clientY
    }));
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
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='info-message'>Fetching items...</div>;
  }

  if (error) {
    console.log(error.message)
    return <div className='info-message'>Error. Try again...</div>;
  }

  return (
    <>
      <div className='loadout-wrapper'>
        <div className='loadout-item' id='item-bag'>
          {items.bag && (
            <img
              onClick={() => toggleLockItem('bag')}
              onMouseEnter={(e) => showTooltip(e, items.bag)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.bag.icon}
              alt={items.bag.name}
              className={lockedItems.bag ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-head'>
          {items.head && (
            <img
              onClick={() => toggleLockItem('head')}
              onMouseEnter={(e) => showTooltip(e, items.head)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.head.icon}
              alt={items.head.name}
              className={lockedItems.head ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-cape'>
          {items.cape && (
            <img
              onClick={() => toggleLockItem('cape')}
              onMouseEnter={(e) => showTooltip(e, items.cape)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.cape.icon}
              alt={items.cape.name}
              className={lockedItems.cape ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-main-hand'>
          {items.mainHand && (
            <img
              onClick={() => toggleLockItem('mainHand')}
              onMouseEnter={(e) => showTooltip(e, items.mainHand)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.mainHand.icon}
              alt={items.mainHand.name}
              className={lockedItems.mainHand ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-body'>
          {items.body && (
            <img
              onClick={() => toggleLockItem('body')}
              onMouseEnter={(e) => showTooltip(e, items.body)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.body.icon}
              alt={items.body.name}
              className={lockedItems.body ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-off-hand'>
          {items.offHand && (
            <img
              onClick={() => toggleLockItem('offHand')}
              onMouseEnter={(e) => showTooltip(e, items.offHand)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.offHand.icon}
              alt={items.offHand.name}
              className={`${lockedItems.offHand ? 'locked-item' : ''} ${isTwoHandedWeapon(items.mainHand) ? 'two-handed' : ''}`}
          
            />
          )}
        </div>
        <div className='loadout-item' id='item-potion'>
          {items.potion && (
            <img
              onClick={() => toggleLockItem('potion')}
              onMouseEnter={(e) => showTooltip(e, items.potion)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.potion.icon}
              alt={items.potion.name}
              className={lockedItems.potion ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-feet'>
          {items.feet && (
            <img
              onClick={() => toggleLockItem('feet')}
              onMouseEnter={(e) => showTooltip(e, items.feet)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.feet.icon}
              alt={items.feet.name}
              className={lockedItems.feet ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-food'>
          {items.food && (
            <img
              onClick={() => toggleLockItem('food')}
              onMouseEnter={(e) => showTooltip(e, items.food)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.food.icon}
              alt={items.food.name}
              className={lockedItems.food ? 'locked-item' : ''}
            />
          )}
        </div>
        <div className='loadout-item' id='item-mount'>
          {items.mount && (
            <img
              onClick={() => toggleLockItem('mount')}
              onMouseEnter={(e) => showTooltip(e, items.mount)}
              onMouseMove={updateTooltipPosition}
              onMouseLeave={hideTooltip}
              src={items.mount.icon}
              alt={items.mount.name}
              className={lockedItems.mount ? 'locked-item' : ''}
            />
          )}
        </div>

        <div className='button-wrapper'>
          <button className='button' id='reroll-button'  onClick={() => reroll(fetchedData)}><img src='dices.png' alt='dices'></img></button>
        </div>

        <div className='button-wrapper'>
          <button className='button' id='refresh-button'  onClick={() => refresh()}><img src='unlocked.png' alt='lock'></img></button>
        </div>

      </div>

      {tooltip.visible && (
        <div
          className='tooltip'
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <h3 className='item-name'>{tooltip.content.name}</h3>
          <h5><span>Base IP: </span>{tooltip.content.item_power}</h5>
          <h5><span>ID: </span>{tooltip.content.identifier}</h5>
        </div>
      )}

      <LoadoutPrice
        lockedItems={lockedItems}
      />
    </>
  );
}

export default Inventory;
