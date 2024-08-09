import React from 'react';
import '../styles/LoadoutPrice.css';
import CityLoadoutPrice from './CityLoadoutPrice.js';

const LoadoutPrice = ({ lockedItems }) => {
    return (
        <>
            <div className='card-container'>
                <CityLoadoutPrice
                    cityName={"Fort Sterling"}
                    lockedItems={lockedItems}
                />
                <CityLoadoutPrice
                    cityName={"Lymhurst"}
                    lockedItems={lockedItems}
                />
                <CityLoadoutPrice
                    cityName={"Thetford"}
                    lockedItems={lockedItems}
                />
                 <CityLoadoutPrice
                    cityName={"Martlock"}
                    lockedItems={lockedItems}
                />
                <CityLoadoutPrice
                    cityName={"Caerleon"}
                    lockedItems={lockedItems}
                />
                <CityLoadoutPrice
                    cityName={"Bridgewatch"}
                    lockedItems={lockedItems}
                />
            </div>
        </>
      );
}

export default LoadoutPrice;