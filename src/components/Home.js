import React from 'react';
import '../styles/Home.css';
import { ReactComponent as LineChartIcon } from '../assets/line-chart-icon.svg';
import DiceIcon from '../assets/dices.png';



function Home() {
  return (
    <div className='home-page'>
      <div className='feature-container'>
        <div className='feature-card'>
          <LineChartIcon className='feature-icon'/>
          <h4>Gold Price Checker</h4>

        </div>
        <div className='feature-card'>
          <img src={DiceIcon} className='feature-icon'/>
          <h4>Lucky Loadout</h4>

        </div>
        <div className='feature-card'>
          <LineChartIcon className='feature-icon'/>
          <h4>Custom Loadouts</h4>

        </div>
        <div className='feature-card'>
          <LineChartIcon className='feature-icon'/>
          <h4>Item Price Checker</h4>

        </div>
        <div className='feature-card'>
          <LineChartIcon className='feature-icon'/>
          <h4>More To Come</h4>

        </div>
      </div>
    </div>
  );
}

export default Home;