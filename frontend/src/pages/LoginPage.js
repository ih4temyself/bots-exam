import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import '../styles/LoginPage.css';
import { useLocation } from 'react-router-dom';
import GoogleAPI from "../components/GoogleApi/GoogleAPI";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Please enter both username and password');
        } else {
            setError(null);
            try {
                const response = await api.post('auth/token/', { username, password });
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/home');  // Redirect to main page
            } catch (error) {
                setError('Invalid login credentials');
            }
        }
    };

    return (
        <div>
            <h2 className="animate-from-top">Login</h2>

            {location.state?.successMessage && (
                <p style={{ color: 'green' }}>{location.state.successMessage}</p>
            )}

            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input className="animate-from-top"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input className="animate-from-top"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="login_button animate-from-top">Login</button>

                <GoogleAPI />
            </form>

            <p className="acc animate-from-top">
                Don't have an account?{' '}
                <div className="register"><Link to="/register">Register here</Link></div>
            </p>

            <div className="return-btn-container">
                <Link to="/">
                    <button className="return-btn animate-from-top">Back</button>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
