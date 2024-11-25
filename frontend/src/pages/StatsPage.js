import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/MyInfoPage.css';

function StatsPage() {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/profile/stats/');
                setBots(response.data.bots);
            } catch (error) {
                console.error('Error fetching main page data', error);
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