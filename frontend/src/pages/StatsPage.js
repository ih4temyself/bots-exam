import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/MyInfoPage.css';

function StatsPage() {
    const [stats, setStats] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingLogs, setLoadingLogs] = useState(true);

    // Fetch user stats data
    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const response = await api.get('/profile/stats/');
                setStats(response.data.stats);
                setLoadingStats(false);
            } catch (error) {
                console.error('Error fetching stats data', error);
                setLoadingStats(false);
            }
        };
        fetchStatsData();
    }, []);

    // Fetch bot logs data
    useEffect(() => {
        const fetchLogsData = async () => {
            try {
                const response = await api.get('/bots/logs/');
                setLogs(response.data.logs);
                setLoadingLogs(false);
            } catch (error) {
                console.error('Error fetching logs data', error);
                setLoadingLogs(false);
            }
        };
        fetchLogsData();
    }, []);

    return (
        <div id="my-info-container">
            <h2>My Stats and Bot Logs</h2>

            {/* Logs Section */}
            <h3>Bot Logs</h3>
            {loadingLogs ? (
                <p>Loading bot logs...</p>
            ) : (
                <div className="user-info">
                    {logs.length > 0 ? (
                        <ul className="logs-list">
                            {logs.map((log, index) => (
                                <li key={index} className="text_info">
                                    {log}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No logs available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default StatsPage;
