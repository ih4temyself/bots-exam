import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import '../styles/BotList.css';

function BotList() {
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/botlist/');
                setBots(response.data.bots);
            } catch (error) {
                console.error('Error fetching main page data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <TopBar/>

            <main className="main-content">
                <div className="bot-table-container">
                    <table className="bot-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Token</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {bots.length > 0 ? (
                            bots.map((bot, index) => (
                                <tr key={index}>
                                    <td>{bot.name}</td>
                                    <td>
                                        <input
                                            type="password"
                                            value={bot.token}
                                            readOnly
                                            className="token-input"
                                        />
                                        <button className="view-token">👁️</button>
                                    </td>
                                    <td className={bot.status === 'Ok' ? 'status-ok' : 'status-stopped'}>
                                        {bot.status === 'Ok' ? (
                                            <>
                                                Ok <span className="status-icon">✔️</span>
                                            </>
                                        ) : (
                                            'Stopped'
                                        )}
                                    </td>
                                    <td>
                                        <button className="edit-button">Edit</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </main>

        </div>
    );
}

export default BotList;
