import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/main/');
                setData(response.data.message);
            } catch (error) {
                console.error('Error fetching main page data', error);
                navigate('/home');  // Redirect to login if unauthorized
            }
        };
        fetchData();
    }, [navigate]);

    return (
        <div>
            <h2>Main Page</h2>
            <p>{data ? data : 'Loading...'}</p>
        </div>
    );
}

export default MainPage;
