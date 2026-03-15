import React, { useState, useEffect } from "react";
import { getKeys } from "../db";
import { getBalance } from "../api";
import BalanceCard from "../components/BalanceCard";
import "./HomePage.css";

function HomePage() {
    const [keys, setKeys] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadKeys();
    }, []);

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
        <div className="home-page">
            <div className="page-header">
                <h1>💰 Главная</h1>
                <p>Управление балансами и заказами</p>
            </div>

            <div className="cards-container">
                <BalanceCard balance={balance} loading={loading} error={error} hasKeys={!!keys} onRefresh={handleRefresh} />

                {/* Здесь будут добавляться новые карточки функционала */}
                <div className="coming-soon-card">
                    <div className="coming-soon-content">
                        <span className="coming-soon-icon">🚀</span>
                        <h3>Скоро</h3>
                        <p>Новый функционал в разработке</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
