import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';


function Standart_Plan() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/standartplan/');
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

export default Standart_Plan;
