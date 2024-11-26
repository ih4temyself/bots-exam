import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';


function Basic_Plan() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/basicplan');
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

export default Basic_Plan;
