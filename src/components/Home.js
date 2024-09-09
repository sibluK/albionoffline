import React from 'react';
import '../styles/Home.css';
import { ReactComponent as LineChartIcon } from '../assets/line-chart-icon.svg';
import { ReactComponent as LoadoutIcon } from '../assets/loadout.svg';
import { ReactComponent as CoinsIcon } from '../assets/coins.svg';
import { ReactComponent as InProgressIcon } from '../assets/in-progress.svg';
import DiceIcon from '../assets/dice.png';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const navigate = useNavigate();
  const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";

  return (
    <div className='home-page'>
      <div className='feature-container'>
        <div className='feature-card' onClick={() => navigate('/loadout')}>
          <img src={DiceIcon} className='feature-icon'/>
          <h4>Lucky Loadout</h4>
          <h5>{lorem}</h5>
        </div>
        <div className='feature-card' onClick={() => navigate('/gold')}>
          <LineChartIcon className='feature-icon'/>
          <h4>Gold Price Checker</h4>
          <h5>{lorem}</h5>
        </div>

        {/*
          <>
            <div className='feature-card'>
              <LoadoutIcon className='feature-icon'/>
              <h4>Custom Loadouts</h4>
              <button className='feature-button'>Try</button>
            </div>
            <div className='feature-card'>
              <CoinsIcon className='feature-icon'/>
              <h4>Item Price Checker</h4>
              <button className='feature-button'>Try</button>
            </div>
          </>
          */
        }
        <div className='feature-card'>
          <InProgressIcon className='feature-icon'/>
          <h4>More To Come</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;