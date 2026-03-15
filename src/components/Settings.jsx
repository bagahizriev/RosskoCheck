import React, { useState } from "react";
import "./Settings.css";

function Settings({ onSave, initialKeys }) {
    const [key1, setKey1] = useState(initialKeys?.key1 || "");
    const [key2, setKey2] = useState(initialKeys?.key2 || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (key1.trim() && key2.trim()) {
            onSave(key1.trim(), key2.trim());
        }
    };

    return (
        <div className="settings">
            <div className="settings-card">
                <h1>⚙️ Настройки</h1>
                <p className="settings-description">Введите ваши ключи API от ROSSKO. Они будут сохранены локально на вашем устройстве.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="key1">KEY1</label>
                        <input id="key1" type="text" value={key1} onChange={(e) => setKey1(e.target.value)} placeholder="Введите KEY1" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="key2">KEY2</label>
                        <input id="key2" type="text" value={key2} onChange={(e) => setKey2(e.target.value)} placeholder="Введите KEY2" required />
                    </div>

                    <button type="submit" className="btn-primary">
                        Сохранить
                    </button>
                </form>

                <div className="info-box">
                    <p>🔒 Ваши ключи хранятся только на этом устройстве и никуда не передаются.</p>
                </div>
            </div>
        </div>
    );
}

export default Settings;
