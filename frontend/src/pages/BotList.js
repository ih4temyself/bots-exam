import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import TopBar from '../components/TopBar/TopBar';
import '../styles/BotList.css';

function BotList() {
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        token: '',
        description: '',
        admin_id: '',
        bot_type: '1',
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        name: '',
        token: '',
        description: '',
        admin_id: '',
        is_active: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('http://127.0.0.1:8000/bots/');
                const botsWithAdditionalData = response.data.map((bot) => ({
                    ...bot,
                    showToken: false,
                }));
                setBots(botsWithAdditionalData);
            } catch (error) {
                console.error('Error fetching main page data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'admin_id' ? Number(value) : value,
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: name === 'admin_id' ? Number(value) : value,
        });
    };

    const handleAddNewBot = async () => {
        try {
            const { bot_type, ...otherData } = formData;
            const config = { bot_type };
            const dataToSend = { ...otherData, config };
            const response = await api.post('http://127.0.0.1:8000/bots/', dataToSend);
            setBots([
                ...bots,
                { ...response.data, showToken: false },
            ]);
            setShowModal(false);
            setFormData({
                name: '',
                token: '',
                description: '',
                admin_id: '',
                bot_type: '1',
            });
        } catch (error) {
            console.error('Error adding new bot', error.response?.data || error.message);
            alert(`Failed to add bot: ${error.response?.data?.detail || error.message}`);
        }
    };

    const handleEditBot = (bot) => {
        setEditFormData({
            id: bot.id,
            name: bot.name,
            token: bot.token,
            description: bot.description,
            admin_id: bot.admin_id,
            is_active: bot.is_active,
        });
        setShowEditModal(true);
    };

    const handleUpdateBot = async () => {
        try {
            const { id, ...otherData } = editFormData;
            const response = await api.put(`http://127.0.0.1:8000/bots/${id}/`, otherData);
            setBots((prevBots) =>
                prevBots.map((bot) =>
                    bot.id === id ? { ...response.data, showToken: bot.showToken } : bot
                )
            );
            setShowEditModal(false);
            setEditFormData({
                id: null,
                name: '',
                token: '',
                description: '',
                admin_id: '',
                is_active: false,
            });
        } catch (error) {
            console.error('Error updating bot', error.response?.data || error.message);
            alert(`Failed to update bot: ${error.response?.data?.detail || error.message}`);
        }
    };

    const handleActivateBot = async (id) => {
        try {
            await api.post(`http://127.0.0.1:8000/bots/${id}/activate/`);
            setBots((prevBots) =>
                prevBots.map((bot) =>
                    bot.id === id ? { ...bot, is_active: true } : bot
                )
            );
            setEditFormData((prevFormData) => ({ ...prevFormData, is_active: true }));
        } catch (error) {
            console.error('Error activating bot', error.response?.data || error.message);
            alert(`Failed to activate bot: ${error.response?.data?.detail || error.message}`);
        }
    };

    const handleDeactivateBot = async (id) => {
        try {
            await api.post(`http://127.0.0.1:8000/bots/${id}/deactivate/`);
            setBots((prevBots) =>
                prevBots.map((bot) =>
                    bot.id === id ? { ...bot, is_active: false } : bot
                )
            );
            setEditFormData((prevFormData) => ({ ...prevFormData, is_active: false }));
        } catch (error) {
            console.error('Error deactivating bot', error.response?.data || error.message);
            alert(`Failed to deactivate bot: ${error.response?.data?.detail || error.message}`);
        }
    };

    const handleDeleteBot = async () => {
        try {
            const { id } = editFormData;
            await api.delete(`http://127.0.0.1:8000/bots/${id}/`);
            setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
            setShowEditModal(false);
            setEditFormData({
                id: null,
                name: '',
                token: '',
                description: '',
                admin_id: '',
                is_active: false,
            });
        } catch (error) {
            console.error('Error deleting bot', error.response?.data || error.message);
            alert(`Failed to delete bot: ${error.response?.data?.detail || error.message}`);
        }
    };

    const toggleTokenVisibility = (botId) => {
        setBots((prevBots) =>
            prevBots.map((bot) =>
                bot.id === botId ? { ...bot, showToken: !bot.showToken } : bot
            )
        );
    };

    return (
        <div>
            <TopBar />
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
                                            type={bot.showToken ? 'text' : 'password'}
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
                                        <button className="edit-button" onClick={() => handleEditBot(bot)}>
                                            Edit
                                        </button>
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
                {/* Add New Bot Modal */}
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
                                    Admin ID:
                                    <input
                                        type="number"
                                        name="admin_id"
                                        value={formData.admin_id}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Bot Type:
                                    <select
                                        name="bot_type"
                                        value={formData.bot_type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Tech Support</option>
                                        <option value="2">Schedule Sender</option>
                                    </select>
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
                {/* Edit Bot Modal */}
                {showEditModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Bot</h2>
                            <form>
                                <label>
                                    Admin ID:
                                    <input
                                        type="number"
                                        name="admin_id"
                                        value={editFormData.admin_id}
                                        onChange={handleEditFormChange}
                                        required
                                    />
                                </label>
                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        onClick={() => handleActivateBot(editFormData.id)}
                                        disabled={editFormData.is_active}
                                    >
                                        Activate
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeactivateBot(editFormData.id)}
                                        disabled={!editFormData.is_active}
                                    >
                                        Deactivate
                                    </button>
                                    <button type="button" onClick={handleUpdateBot}>
                                        Save
                                    </button>
                                    <button type="button" onClick={handleDeleteBot}>
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default BotList;
