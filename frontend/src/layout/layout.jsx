import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/layout/header/header';
import Footer from '@/layout/footer/footer';

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