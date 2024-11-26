import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/MyInfoPage.css';

function MyInfoPage() {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('/profile/myinfo');
                setUserInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user information', error);
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div id="my-info-container">
            <h2>My Information</h2>
            {loading ? (
                <p>Loading user information...</p>
            ) : (
                <div className="user-info">
                    <div className="text_info"><strong>Name:</strong> {userInfo.name} </div>
                    <div className="text_info"><strong>Email:</strong> {userInfo.email}</div>
                    <div className="text_info"><strong>Joined:</strong> {new Date(userInfo.created_at).toLocaleDateString()}</div>
                    <h3><div className="text_info"><strong>Balance:</strong> ${userInfo.balance}</div></h3>
                </div>
            )}
        </div>

    );
}

export default MyInfoPage;
