import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import SideBar_Profile from "../components/SideBar_Profile/SideBar_Profile";
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
            <TopBar/>
            <div className="container">
                <SideBar_Profile />
                <div className="main_container">
                </div>
            </div>
        </section>
    );
}

    export default ProfilePage;