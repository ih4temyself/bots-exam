import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/MyInfoPage.css';

function BillingsPage() {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/profile/billings/');
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

    export default BillingsPage;