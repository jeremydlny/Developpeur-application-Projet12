// header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import '@/styles/header.css';

const header = () => {
    return (
        <div className='header'>
            <header>
                <div className="logo">
                    <Link to="/home">
                        <img src={logo} alt='Sportsee logo' />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li><a href='/home'>Accueil</a></li>
                        <li><a href='/profil'>Profil</a></li>
                        <li><a href='/reglage'>Réglage</a></li>
                        <li><a href='/communaute'>Communauté</a></li> 
                    </ul>
                </nav>  
            </header>
        </div>
    );
};

export default header;