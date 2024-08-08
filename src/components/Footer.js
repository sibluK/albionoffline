import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <p>&copy; {new Date().getFullYear()} Albion Offline</p>
            <nav>
                <ul>
                    <li><a href="/albionoffline">Home</a></li>
                    <li><a href="/albionoffline/loadout">Lucky Loadout</a></li>
                    <li><a href="/albionoffline/gold">Gold Tracker</a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;