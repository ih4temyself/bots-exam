import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Please enter both email and password');
        } else {
            setError(null);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login_button">Login</button>
            </form>

            <p>
                Don't have an account?{' '}
                <div className="register"><Link to="/register">Register here</Link></div>
            </p>

            {/* Return Button */}
            <div className="return-btn-container">
                <Link to="/">
                    <button className="return-btn">Back</button>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
