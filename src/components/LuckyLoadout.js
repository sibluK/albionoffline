import React from 'react';
import Inventory from './Inventory.js'
import '../styles/Inventory.css';
import PriceCheckWindow from './PriceCheckWindow.js';

function LuckyLoadout() {

  return (
    <>

      <div className='loadout-page'>
        <Inventory/>
        {/* <PriceCheckWindow /> */}
      </div>

    </>
  );
}

export default LuckyLoadout;