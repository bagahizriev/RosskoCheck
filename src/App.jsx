import React, { useState } from "react";
import { Home, Settings as SettingsIcon } from "lucide-react";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("home");

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
