import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar_Profile.css';

function SideBar_Profile() {
    return (
        <div className="side_container">
            <div className="side_bar">
                <NavLink
                    to="/myinfo"
                    className="nav-link"
                    activeClassName="active"
                    exact
                >
                    My Info
                </NavLink>
            </div>

            <div className="side_bar">
            <NavLink
                to="/stats"
                className="nav-link"
                activeClassName="active"
            >
                Stats
            </NavLink>
            </div>

            <div className="side_bar">
            <NavLink
                to="/billings"
                className="nav-link"
                activeClassName="active"
            >
                Billings
            </NavLink>
            </div>
        </div>
    );
}

export default SideBar_Profile;
