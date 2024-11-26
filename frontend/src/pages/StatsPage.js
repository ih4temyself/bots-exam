import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import SideBarProfile from "../components/SideBarProfile/SideBarProfile";
import '../styles/MyInfoPage.css';

function StatsPage() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/profile/stats/');
                setStats(response.data.stats);
            } catch (error) {
                console.error('Error fetching stats data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <section>
        </section>
    );
}

export default StatsPage;
