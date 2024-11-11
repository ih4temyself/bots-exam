import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';

function MainPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/main/');
                setData(response.data.message);
            } catch (error) {
                console.error('Error fetching main page data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Main Page</h2>
            <p>{data ? data : 'Loading...'}</p>
        </div>
    );
}

export default MainPage;
