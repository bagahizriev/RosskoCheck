import React from "react";
import { RefreshCw } from "lucide-react";
import "./BalanceCard.css";

function BalanceCard({ balance, loading, error, hasKeys, onRefresh }) {
    const getBalanceColor = (balanceValue) => {
        const value = parseFloat(balanceValue);
        if (value > 0) return "positive";
        if (value < 0) return "negative";
        return "zero";
    };

    const formatBalance = (balanceStr) => {
        return balanceStr.replace(/руб/g, "₽");
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Загрузка...</p>
                </div>
            );
        }

        if (!hasKeys) {
            return (
                <div className="no-data">
                    <div className="no-data-icon">📊</div>
                    <h3>Нет данных</h3>
                    <p>Укажите действующие ключи API ROSSKO в настройках</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error">
                    <div className="error-icon">❌</div>
                    <h3>Ошибка</h3>
                    <p>{error}</p>
                    <button onClick={onRefresh} className="btn-retry">
                        Попробовать снова
                    </button>
                </div>
            );
        }

        if (balance) {
            return (
                <div className="balance-content">
                    <div className="balance-main">
                        <p className={`balance-amount ${getBalanceColor(balance.balance)}`}>{formatBalance(`${balance.balance} ${balance.currency}`)}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="no-data">
                <div className="no-data-icon">📊</div>
                <h3>Нет данных</h3>
                <p>Проверьте ключи API в настройках</p>
            </div>
        );
    };

    return (
        <div className="balance-card">
            <div className="card-header">
                <div className="card-title">
                    <h3>РОССКО</h3>
                </div>
                {hasKeys && (
                    <button onClick={onRefresh} className="btn-refresh-small" disabled={loading}>
                        <RefreshCw size={16} className={loading ? "spinning" : ""} />
                    </button>
                )}
            </div>

            <div className="card-content">{renderContent()}</div>
        </div>
    );
}

export default BalanceCard;
