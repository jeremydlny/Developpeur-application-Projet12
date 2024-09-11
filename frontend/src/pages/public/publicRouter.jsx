// publicRouter.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/layout/layout';
import Home from '@/pages/public/home/UserProfile.jsx';

const publicRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="" element={<Navigate to="/home" />} />
                <Route path='/home' element={<Home />} />
            </Route>
        </Routes>
    );
};

export default publicRouter;