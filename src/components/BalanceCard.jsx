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
                <div className="balance-main">
                    <p className="balance-amount zero">Загрузка...</p>
                </div>
            );
        }

        if (!hasKeys) {
            return (
                <div className="balance-main">
                    <p className="balance-amount zero">Нет данных</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="balance-main">
                    <p className="balance-amount zero">Ошибка</p>
                </div>
            );
        }

        if (balance) {
            return (
                <div className="balance-main">
                    <p className={`balance-amount ${getBalanceColor(balance.balance)}`}>{formatBalance(`${balance.balance} ${balance.currency}`)}</p>
                </div>
            );
        }

        return (
            <div className="balance-main">
                <p className="balance-amount zero">Нет данных</p>
            </div>
        );
    };

    return (
        <div className="balance-card">
            <div className="card-header">
                <div className="card-title">
                    <h3>Росско</h3>
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
