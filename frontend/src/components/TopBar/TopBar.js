import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
    return (
        <div className="top-bar">
            <div className="logo">Logo</div>
            <div className="nav-bar">
                <NavLink
                    to="/home"
                    className="nav-link"
                    activeClassName="active"
                    exact
                >
                    Home
                </NavLink>
                <NavLink
                    to="/botlist"
                    className="nav-link"
                    activeClassName="active"
                >
                    Botlist
                </NavLink>
                <NavLink
                    to="/profile"
                    className="nav-link"
                    activeClassName="active"
                >
                    Profile
                </NavLink>
            </div>
                <NavLink
                    to="/"
                    className="nav-link"
                    activeClassName="active"
                    exact
                >
            <button className="sign-out">Sign out</button>
                </NavLink>
        </div>
    );
}

export default TopBar;
