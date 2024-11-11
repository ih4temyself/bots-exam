import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('access_token');
    const isAuthenticated = token && token !== 'undefined' && token !== 'null' && token !== '';

    console.log('Token:', token);
    console.log('isAuthenticated:', isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
