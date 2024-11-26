import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !firstName || !lastName || !email || !password || !passwordCheck) {
            setError('All fields are required');
            return;
        }

        if (password !== passwordCheck) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, first_name: firstName, last_name: lastName, email, password, password_check: passwordCheck }),
            });

            if (response.ok) {
                navigate('/login', { state: { successMessage: 'Registration successful! Please log in.' } });
            } else {
                const data = await response.json();
                if (data.password) {
                    setError(data.password[0]);
                } else if (data.username) {
                    setError(data.username[0]);
                } else if (data.email) {
                    setError(data.email[0]);
                } else {
                    setError('Registration failed');
                }
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('An error occurred');
        }
    };

    return (
        <div>
            <h2 className="animate-from-top">Register</h2>
            <form onSubmit={handleRegister}>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input className="animate-from-top"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input className="animate-from-top"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input className="animate-from-top"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input className="animate-from-top"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="animate-from-top"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="animate-from-top"
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <button type="submit" className="login_button animate-from-top">Register</button>
            </form>

            <div className="return-btn-container animate-from-top">
                <Link to="/">
                    <button className="return-btn animate-from-top">Back</button>
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;
