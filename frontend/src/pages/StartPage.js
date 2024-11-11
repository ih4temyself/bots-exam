import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StartPage.css';

function StartPage() {
    return (
        <div className="start-page">
            <h1 className="welcome">Welcome to Botiki</h1>

            <div className="button-container">
                <Link to="/login">
                    <button className="start-btn" id="login">Login</button>
                </Link>
                <Link to="/register">
                    <button className="start-btn" id="register">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default StartPage;
