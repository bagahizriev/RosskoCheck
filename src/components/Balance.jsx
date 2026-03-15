import React, { useEffect } from "react";
import "./Balance.css";

function Balance({ balance, loading, error, onRefresh, onSettings }) {
    useEffect(() => {
        if (!balance && !loading && !error) {
            onRefresh();
        }
    }, []);

    return (
        <div className="balance">
            <div className="balance-card">
                <div className="balance-header">
                    <h1>💰 ROSSKO Balance</h1>
                    <button onClick={onSettings} className="btn-settings" title="Настройки">
                        ⚙️
                    </button>
                </div>

                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Загрузка...</p>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <p>❌ {error}</p>
                        <button onClick={onRefresh} className="btn-retry">
                            Попробовать снова
                        </button>
                    </div>
                )}

                {balance && !loading && (
                    <div className="balance-content">
                        <div className="balance-main">
                            <p className="balance-label">Общий баланс</p>
                            <p className={`balance-amount ${parseFloat(balance.balance) < 0 ? "negative" : "positive"}`}>
                                {balance.balance} {balance.currency}
                            </p>
                            <p className="balance-type">{balance.type}</p>
                        </div>

                        {balance.customers && balance.customers.length > 0 && (
                            <div className="customers">
                                <h3>Контрагенты</h3>
                                {balance.customers.map((customer, index) => (
                                    <div key={index} className="customer-item">
                                        <span className="customer-name">{customer.name}</span>
                                        <span className={`customer-balance ${parseFloat(customer.balance) < 0 ? "negative" : "positive"}`}>
                                            {customer.balance} {balance.currency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button onClick={onRefresh} className="btn-refresh">
                            🔄 Обновить
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Balance;
