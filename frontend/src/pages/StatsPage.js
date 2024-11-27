import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/StatsPage.css';

function StatsPage() {
    const [stats, setStats] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingLogs, setLoadingLogs] = useState(true);

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

    const parseLog = (log) => {
        const regex = /^\[([^\]]+)\] (\w+) ([^\s]+)\s*(.*)/;
        const matches = log.match(regex);
        if (matches) {
            return {
                timestamp: matches[1],
                logType: matches[2],
                source: matches[3],
                message: matches[4],
            };
        }
        return {};
    };

    const getLogClass = (logType) => {
        switch (logType.toLowerCase()) {
            case "error":
                return "log-error";
            case "warning":
                return "log-warning";
            default:
                return "log-info";
        }
    };

    return (
        <div id="stats-container">
            <h2>My Stats and Bot Logs</h2>

            <h3>Log Viewer</h3>
            {loadingLogs ? (
                <p className="loading-text">Loading bot logs...</p>
            ) : (
                <div className="user-info">
                    {logs.length > 0 ? (
                        <table className="logs-table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Log Source</th>
                                    <th>Message</th>
                                    <th>Log Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, index) => {
                                    const parsedLog = parseLog(log);
                                    return (
                                        <tr key={index}>
                                            <td>{parsedLog.timestamp}</td>
                                            <td className={getLogClass(parsedLog.logType)}>
                                                {parsedLog.source}
                                            </td>
                                            <td>{parsedLog.message}</td>
                                            <td>{parsedLog.logType}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-logs">No logs available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default StatsPage;
