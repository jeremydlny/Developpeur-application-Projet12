// layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/layout/header/header';
import Footer from '@/layout/footer/footer';

/**
 * Renders the layout of the application.
 * @returns {JSX.Element} The layout component.
 */
const layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default layout;