import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/BillingsPage.css';

function BillingsPage() {
    const [billingInfo, setBillingInfo] = useState([]);
    const [activeBots, setActiveBots] = useState([]);
    const [stoppedBots, setStoppedBots] = useState([]);

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await api.get('/profile/billings');
                setBillingInfo(response.data.billingDetails);
                setActiveBots(response.data.activeBots);
                setStoppedBots(response.data.stoppedBots);
            } catch (error) {
                console.error('Error fetching billing data', error);
            }
        };

        fetchBillingData();
    }, []);

    return (
        <div className="billing-container">
            <div className="container_active_stopped">
            <div className="bot-section">
                <div className="active-bots">
                    <h3>Active bots:</h3>
                    {activeBots.length > 0 ? (
                        activeBots.map((bot, index) => (
                            <div key={index} className="bot-card">
                                <div className="bot-details">
                                    <div><strong>{bot.name}</strong></div>
                                    <div>Status: {bot.status} {bot.status === 'active' && <span className="status-active">✔️</span>}</div>
                                    <div>Runtime: {bot.runtime}</div>
                                </div>
                                <div className="billing-info">
                                    <div className="card-info">
                                        <select>
                                            <option>{bot.cardNumber}</option> {/* Assuming card number from API */}
                                        </select>
                                        <p>{bot.price} /mo</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No active bots.</p>
                    )}
                </div>

                <div className="stopped-bots">
                    <h3>Stopped bots:</h3>
                    {stoppedBots.length > 0 ? (
                        stoppedBots.map((bot, index) => (
                            <div key={index} className="bot-card">
                                <div className="bot-details">
                                    <div><strong>{bot.name}</strong></div>
                                    <div>Status: {bot.status}</div>
                                    <div>Runtime: {bot.runtime}</div>
                                </div>
                                <div className="billing-info">
                                    <div className="card-info">
                                        <select>
                                            <option>{bot.cardNumber}</option> {/* Assuming card number from API */}
                                        </select>
                                        <p>{bot.price} /mo</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No stopped bots.</p>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default BillingsPage;
