import React, { useState } from "react";
import RosskoSettings from "../components/RosskoSettings";
import { updateChecker } from "../utils/updateChecker";
import "./SettingsPage.css";

function SettingsPage() {
    const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

    const handleForceUpdate = async () => {
        setIsCheckingUpdate(true);
        try {
            const hasUpdate = await updateChecker.checkForUpdates();
            if (hasUpdate) {
                updateChecker.forceUpdate();
            } else {
                alert("У вас уже установлена последняя версия приложения");
            }
        } catch (error) {
            alert("Ошибка при проверке обновлений");
        } finally {
            setIsCheckingUpdate(false);
        }
    };

    return (
        <div className="settings-page">
            <div className="page-header">
                <h1>⚙️ Настройки</h1>
                <p>Конфигурация приложения</p>
            </div>

            <div className="settings-sections">
                <RosskoSettings />

                {/* Секция обновлений */}
                <div className="update-section">
                    <div className="section-header">
                        <h3>🔄 Обновления</h3>
                    </div>
                    <div className="section-content">
                        <p>Проверить наличие обновлений приложения</p>
                        <button className="update-button" onClick={handleForceUpdate} disabled={isCheckingUpdate}>
                            {isCheckingUpdate ? "Проверка..." : "Проверить обновления"}
                        </button>
                    </div>
                </div>

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
