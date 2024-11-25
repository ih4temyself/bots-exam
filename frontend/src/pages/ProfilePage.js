import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
<<<<<<< Updated upstream
=======
import SideBarProfile from "../components/SideBarProfile/SideBarProfile";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <div>
            <TopBar />

        </div>
=======
        <section>
            <TopBar/>
            <div className="container">
                <Outlet />
                <SideBarProfile />
                <div className="main_container">
                </div>
            </div>
        </section>
>>>>>>> Stashed changes
    );
}

    export default ProfilePage;