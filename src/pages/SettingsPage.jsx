import React from "react";
import RosskoSettings from "../components/RosskoSettings";
import "./SettingsPage.css";

function SettingsPage() {
    return (
        <div className="settings-page">
            <div className="page-header">
                <h1>⚙️ Настройки</h1>
                <p>Конфигурация приложения</p>
            </div>

            <div className="settings-sections">
                <RosskoSettings />

                {/* Здесь будут добавляться новые секции настроек */}
                <div className="coming-soon-section">
                    <div className="section-header">
                        <h3>🔧 Дополнительные настройки</h3>
                    </div>
                    <div className="coming-soon-content">
                        <p>Новые настройки появятся здесь</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
