// footer.jsx

import React from 'react';
import yoga from '@/assets/yoga.png';
import swimming from '@/assets/swimming.png';
import cycling from '@/assets/cycling.png';
import strength from '@/assets/strength.png';
import '@/styles/footer.css';

/**
 * Renders the footer component.
 * @returns {JSX.Element} The rendered footer component.
 */
const footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-activities'>
                <img src={yoga} alt="Yoga" />
                <img src={swimming} alt="Swimming" />
                <img src={cycling} alt="Cycling" />
                <img src={strength} alt="Strength training" />
            </div>
            <div className='text-footer'>
                <p>Copiryght, SportSee 2020</p>
            </div>
        </footer>
    );
};

export default footer;