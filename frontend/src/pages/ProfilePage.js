import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import SideBarProfile from "../components/SideBarProfile/SideBarProfile";
import '../styles/ProfilePage.css';

function ProfilePage() {
    const [bots, setBots] = useState([]);

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
                <div className="main_container">
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

    export default ProfilePage;
