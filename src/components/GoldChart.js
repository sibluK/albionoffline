import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import '../styles/GoldChart.css';
import SilverIcon from '../assets/silver.png';
import GoldIcon from '../assets/gold.png'

const formatDate = (date) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-');
  };

const calculateStartDate = (range) => {
    const now = new Date();
    let startDate;
  
    switch (range) {
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      default:
        startDate = now;
    }
  
    return formatDate(startDate);
  };

  const filterOutliers = (data) => {
    const prices = data.map(item => item.price);
    const q1 = d3.quantile(prices, 0.25);
    const q3 = d3.quantile(prices, 0.75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
  
    return data.filter(item => item.price >= lowerBound && item.price <= upperBound);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

function GoldChart() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRange, setSelectedRange] = useState('month');
    const [latestGoldPrice, setLatestGoldPrice] = useState(0);
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [dateRange, setDateRange] = useState({
        startDate: calculateStartDate('month'),
        endDate: formatDate(new Date()),
    });

    useEffect(() => {
        if (!dateRange.startDate || !dateRange.endDate) {
            return;
        }
        const apiUrl = `https://europe.albion-online-data.com/api/v2/stats/Gold.json?date=${dateRange.startDate}&end_date=${dateRange.endDate}`;
    
        axios.get(apiUrl)
            .then(response => {
                const transformedData = response.data.map(item => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleString()
                }));
                const filteredData = filterOutliers(transformedData);
                setData(filteredData);

                if (filteredData.length > 0) {
                  setLatestGoldPrice(filteredData[filteredData.length - 1].price);
              }
                setLoading(false);
            })
            .catch(error => {
            setError(error);
            setLoading(false);
            });
        }, [dateRange]);

        const handleButtonClick = (range) => {
          let startDate, endDate;
      
          switch (range) {
              case 'month':
                  startDate = calculateStartDate('month');
                  endDate = formatDate(new Date());
                  break;
              case 'week':
                  startDate = calculateStartDate('week');
                  endDate = formatDate(new Date());
                  break;
              case 'today':
                  const today = new Date();
                  startDate = formatDate(new Date(today.setDate(today.getDate() - 1)));
                  endDate = formatDate(new Date());
                  break;
              case 'all':
                  startDate = formatDate(new Date('2024-04-29'));
                  endDate = formatDate(new Date());
                  break;
              default:
                  startDate = calculateStartDate('month');
                  endDate = formatDate(new Date());
          }
      
          setDateRange({ startDate, endDate });
          setSelectedRange(range);
      };
      

        if (loading) return <div>Loading...</div>;
        if (error) {
          console.log(error.message);
        };

        const maxValue = data ? Math.max(...data.map(item => item.price)) + 200 : 0;
        const minValue = data ? Math.min(...data.map(item => item.price)) - 200: 0;

      const silverToGold = (amount) => {
        if (latestGoldPrice > 0) {
          const gold = (amount / latestGoldPrice).toFixed(0);
          return gold;
        }
        return 0;
      };
  
      const goldToSilver = (amount) => {
        if (latestGoldPrice > 0) {
          const silver = (amount * latestGoldPrice).toFixed(0);
          return silver;
        }
        return 0;
      };

  
    return (
      <>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart data={data} margin={{ top: 50, right: 70, left: 70, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="timestamp" tick={0}/>
              <YAxis 
                  domain={[minValue, maxValue]} 
                  interval={2} 
                  tickCount={Math.ceil((maxValue) / 250) + 1} 
                  tickFormatter={(value) => value.toFixed(0)} 
              />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#E1C917" activeDot={{ r: 6 }} />
              <Brush dataKey="timestamp" height={30} stroke="#000000"/>
          </LineChart>
        </ResponsiveContainer>
        <div className='button-wrapper'>
          <button 
            className={`button ${selectedRange === 'all' ? 'selected' : ''}`} 
            id='all-time-button'  
            onClick={() => handleButtonClick('all')}>All time
          </button>
          <button 
            className={`button ${selectedRange === 'month' ? 'selected' : ''}`} 
            id='month-button'  
            onClick={() => handleButtonClick('month')}>Past month
          </button>
          <button 
            className={`button ${selectedRange === 'week' ? 'selected' : ''}`} 
            id='week-button'  
            onClick={() => handleButtonClick('week')}>Past week
          </button>
          <button 
            className={`button ${selectedRange === 'today' ? 'selected' : ''}`} 
            id='today-button'  
            onClick={() => handleButtonClick('today')}>24h
          </button>
        </div>

        <div className='gold-calc-wrapper'>
          <div className='gold-to-silver-wrapper'>
            <h4>Input Gold:</h4>
            <input
              className='gold-silver-input'
              type='number'
              onChange={(e) => {
                setSilver(goldToSilver(e.target.value));
              }}
            ></input>
            <h3>{formatNumber(silver)}<img id='silver-icon' src={SilverIcon} alt='Silver Coin'></img></h3>
          </div>
          <div className='silver-to-gold-wrapper'>
            <h4>Input Silver:</h4>
            <input
              className='gold-silver-input'
              type='number'
              onChange={(e) => {
                setGold(silverToGold(e.target.value));
              }}
            ></input>
            <h3>{formatNumber(gold)}<img id='gold-icon' src={GoldIcon} alt='Gold Coin'></img></h3>
          </div>
        </div>

      </>
    );
  }
  
  export default GoldChart;