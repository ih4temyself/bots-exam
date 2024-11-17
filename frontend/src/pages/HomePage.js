import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import '../styles/HomePage.css';

function HomePage() {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/home/');
                setBots(response.data.bots);
            } catch (error) {
                console.error('Error fetching main page data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <TopBar />

        </div>
    );
}

    export default HomePage;