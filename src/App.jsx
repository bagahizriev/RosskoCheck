import React, { useState, useEffect } from "react";
import { Home, Settings as SettingsIcon } from "lucide-react";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import { updateChecker } from "./utils/updateChecker";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("home");

    useEffect(() => {
        // Запускаем проверку обновлений
        updateChecker.startPeriodicCheck(300000); // каждые 5 минут

        // Очистка при размонтировании
        return () => {
            updateChecker.stopPeriodicCheck();
        };
    }, []);

    return (
        <div className="app">
            <div className="app-content">
                {currentPage === "home" && <HomePage />}
                {currentPage === "settings" && <SettingsPage />}
            </div>

            <nav className="bottom-nav">
                <button className={`nav-item ${currentPage === "home" ? "active" : ""}`} onClick={() => setCurrentPage("home")}>
                    <Home size={24} />
                    <span>Главная</span>
                </button>

                <button className={`nav-item ${currentPage === "settings" ? "active" : ""}`} onClick={() => setCurrentPage("settings")}>
                    <SettingsIcon size={24} />
                    <span>Настройки</span>
                </button>
            </nav>
        </div>
    );
}

export default App;
