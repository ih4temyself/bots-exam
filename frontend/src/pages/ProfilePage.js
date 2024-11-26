import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import SideBarProfile from "../components/SideBarProfile/SideBarProfile";
import '../styles/ProfilePage.css';

function ProfilePage() {
    const [bots, setBots] = useState([]);
    const location = useLocation();

    const getContainerStyle = () => {
        if (location.pathname === '/profile/myinfo') {
            return {
                width: '500px',
                margin: '0 auto'
            };
        } else
            return {
            width: '999px',
            marginLeft: '296px',
        };

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/profile/');
                setBots(response.data.bots);
            } catch (error) {
                console.error('Error fetching main page data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <section>
            <TopBar />
            <div className="container">
                <SideBarProfile />
                <div className="main_container" style={getContainerStyle()}>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;
