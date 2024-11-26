import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BotList from './pages/BotList';
// import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import GlobalStyles from './styles/GlobalStyles';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import MyInfoPage from './pages/MyInfoPage';
import StatsPage from './pages/StatsPage';
import BillingsPage from './pages/BillingsPage';

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/botlist"
                    element={
                        <ProtectedRoute>
                            <BotList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                >
                    {/* Nested Routes inside /profile */}
                    <Route path="myinfo" element={<MyInfoPage />} />
                    <Route path="stats" element={<StatsPage />} />
                    <Route path="billings" element={<BillingsPage />} />
                </Route>

                {/*<Route path="*" element={<NotFoundPage />} />*/}
            </Routes>
        </div>
    );
}

export default App;
