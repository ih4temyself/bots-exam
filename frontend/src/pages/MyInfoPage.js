import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/MyInfoPage.css';

function MyInfoPage() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('/profile/myinfo');
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user information', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="my-info-container">
            <h2>My Information</h2>
            {userInfo ? (
                <div className="user-info">
                    <div><strong>Name:</strong> {userInfo.name}</div>
                    <div><strong>Email:</strong> {userInfo.email}</div>
                    <div><strong>Joined:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</div>
                    {/* Add other info as needed */}
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
}

export default MyInfoPage;
