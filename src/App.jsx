import React, { useState, useEffect } from "react";
import { Home, Settings } from "lucide-react";
import SettingsPage from "./pages/SettingsPage";
import BalanceCard from "./components/BalanceCard";
import { getKeys } from "./db";
import { getBalance } from "./api";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [keys, setKeys] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadKeys();
    }, []);

    useEffect(() => {
        // Перезагружаем ключи при переходе на главную страницу
        if (currentPage === "home") {
            loadKeys();
        }
    }, [currentPage]);

    const loadKeys = async () => {
        const savedKeys = await getKeys();
        setKeys(savedKeys);
        if (savedKeys) {
            fetchBalance(savedKeys.key1, savedKeys.key2);
        }
    };

    const fetchBalance = async (key1, key2) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getBalance(key1, key2);
            setBalance(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        if (keys) {
            fetchBalance(keys.key1, keys.key2);
        }
    };

    return (
        <div className="app">
            <div className="app-content">
                {currentPage === "home" && <BalanceCard balance={balance} loading={loading} error={error} hasKeys={!!keys} onRefresh={handleRefresh} />}
                {currentPage === "settings" && <SettingsPage />}
            </div>

            <nav className="bottom-nav">
                <button className={`nav-item ${currentPage === "home" ? "active" : ""}`} onClick={() => setCurrentPage("home")}>
                    <Home size={24} strokeWidth={3} stroke="#000000" />
                </button>

                <button className={`nav-item ${currentPage === "settings" ? "active" : ""}`} onClick={() => setCurrentPage("settings")}>
                    <Settings size={24} strokeWidth={3} stroke="#000000" />
                </button>
            </nav>
        </div>
    );
}

export default App;
