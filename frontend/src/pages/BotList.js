import React, {useEffect, useState} from 'react';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import '../styles/BotList.css';

function BotList() {
    const [bots, setBots] = useState([]); // Список ботів
    const [loading, setLoading] = useState(true); // Стан завантаження
    const [showModal, setShowModal] = useState(false); // Стан модального вікна
    const [formData, setFormData] = useState({
        name: '',
        token: '',
        description: '',
        config: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('http://127.0.0.1:8000/bots/');
                const botsWithVisibility = response.data.map((bot) => ({
                    ...bot,
                    showToken: false, // Add initial visibility state for each bot
                }));
                setBots(botsWithVisibility);
            } catch (error) {
                console.error('Error fetching main page data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleAddNewBot = async () => {
        try {
            const response = await api.post('http://127.0.0.1:8000/bots/', formData);
            setBots([
                ...bots,
                {...response.data, showToken: false}, // Add new bot with visibility state
            ]);
            setShowModal(false);
            setFormData({name: '', token: '', description: '', config: ''});
        } catch (error) {
            console.error('Error adding new bot', error);
        }
    };

    const toggleTokenVisibility = (botId) => {
        setBots((prevBots) =>
            prevBots.map((bot) =>
                bot.id === botId ? {...bot, showToken: !bot.showToken} : bot
            )
        );
    };

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
                        {loading ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : bots.length > 0 ? (
                            bots.map((bot) => (
                                <tr key={bot.id}>
                                    <td>{bot.name}</td>
                                    <td>
                                        <input
                                            type={bot.showToken ? 'text' : 'password'} // Toggle input type
                                            value={bot.token}
                                            readOnly
                                            className="token-input"
                                        />
                                        <button
                                            className="view-token"
                                            onClick={() => toggleTokenVisibility(bot.id)}
                                        >
                                            {bot.showToken ? '🙈' : '👁'}
                                        </button>
                                    </td>
                                    <td className={bot.is_active ? 'status-ok' : 'status-stopped'}>
                                        {bot.is_active ? (
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
                                <td colSpan="4">No bots found.</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="4">
                                <button
                                    className="add-button"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add New
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Bot</h2>
                        <form>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Token:
                                <input
                                    type="text"
                                    name="token"
                                    value={formData.token}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Config:
                                <textarea
                                    name="config"
                                    value={formData.config}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <div className="modal-actions">
                                <button type="button" onClick={handleAddNewBot}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BotList;