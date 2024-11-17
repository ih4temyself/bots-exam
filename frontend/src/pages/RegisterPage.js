import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';


function RegisterPage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState(null);

    const isPasswordStrong = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate password match
        if (password !== passwordCheck) {
            setError("Passwords do not match");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        if (!isPasswordStrong(password)) {
            setError("Password is too weak. It should contain at least 8 characters, including letters and numbers.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, first_name: firstName, last_name: lastName, email, password }),
            });

            if (response.ok) {
                console.log('User registered successfully');
            } else {
                const data = await response.json();
                setError(data.error || 'Registration failed');
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
