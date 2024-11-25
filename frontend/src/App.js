import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BotList from './pages/BotList';
// import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import GlobalStyles from './styles/GlobalStyles';
<<<<<<< Updated upstream
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
=======
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import MyInfoPage from './pages/MyInfoPage';
import StatsPage from './pages/StatsPage';
import BillingsPage from './pages/BillingsPage';
>>>>>>> Stashed changes

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
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
<<<<<<< Updated upstream
                />

                {/*<Route path="*" element={<NotFoundPage />} />*/}
=======
                >
                    {/* Nested routes */}
                    <Route path="myinfo" element={<MyInfoPage />} />
                    <Route path="stats" element={<StatsPage />} />
                    <Route path="billings" element={<BillingsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
>>>>>>> Stashed changes
            </Routes>
        </div>
    );
}

export default App;
