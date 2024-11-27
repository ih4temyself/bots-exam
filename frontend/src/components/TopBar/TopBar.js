import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './TopBar.css';
import logo from '../../assets/images/logo_botiki.png'

function TopBar() {
    const location = useLocation();
    const isProfileActive = location.pathname.startsWith("/profile");
    return (
        <div className="top-bar">
            <NavLink
                    to="/home"
                    className="logo"
                    exact
                >
                <img src={logo} alt="Logo"/>
            </NavLink>

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
                    to="/profile/myinfo"
                    className={`nav-link ${isProfileActive ? 'active' : ''}`}
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
