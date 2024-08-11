import React from 'react';
import Inventory from './Inventory.js'
import '../styles/Inventory.css';

function LuckyLoadout() {

  return (
    <>

      <div className='loadout-page'>
        <Inventory/>
      </div>

    </>
  );
}

export default LuckyLoadout;