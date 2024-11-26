import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBarProfile.css';

function SideBarProfile() {
    return (
        <div className="side_container">
            <div className="side_bar">
                <NavLink
                    to="/profile/myinfo"
                    className="nav-link"
                    activeClassName="active"
                    exact
                >
                    My Info
                </NavLink>
            </div>

            <div className="side_bar">
            <NavLink
                to="/profile/stats"
                className="nav-link"
                activeClassName="active"
            >
                Stats
            </NavLink>
            </div>

            <div className="side_bar">
            <NavLink
                to="/profile/billings"
                className="nav-link"
                activeClassName="active"
            >
                Billings
            </NavLink>
            </div>
        </div>
    );
}

export default SideBarProfile;