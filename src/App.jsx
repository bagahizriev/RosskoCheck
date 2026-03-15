import React, { useState, useEffect } from "react";
import { getKeys, saveKeys } from "./db";
import { getBalance } from "./api";
import Settings from "./components/Settings";
import Balance from "./components/Balance";
import "./App.css";

function App() {
    const [keys, setKeys] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        const savedKeys = await getKeys();
        setKeys(savedKeys);
        if (!savedKeys) {
            setShowSettings(true);
        }
    };

    const handleSaveKeys = async (key1, key2) => {
        await saveKeys(key1, key2);
        setKeys({ key1, key2 });
        setShowSettings(false);
        fetchBalance(key1, key2);
    };

    const fetchBalance = async (key1, key2) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getBalance(key1 || keys.key1, key2 || keys.key2);
            setBalance(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        if (keys) {
            fetchBalance();
        }
    };

    if (showSettings || !keys) {
        return <Settings onSave={handleSaveKeys} initialKeys={keys} />;
    }

    return (
        <div className="app">
            <Balance balance={balance} loading={loading} error={error} onRefresh={handleRefresh} onSettings={() => setShowSettings(true)} />
        </div>
    );
}

export default App;
