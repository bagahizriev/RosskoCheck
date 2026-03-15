import React, { useState, useEffect } from "react";
import { Save, Key } from "lucide-react";
import { getKeys, saveKeys } from "../db";
import "./RosskoSettings.css";

function RosskoSettings() {
    const [key1, setKey1] = useState("");
    const [key2, setKey2] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        const savedKeys = await getKeys();
        if (savedKeys) {
            setKey1(savedKeys.key1);
            setKey2(savedKeys.key2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!key1.trim() || !key2.trim()) return;

        setSaving(true);
        try {
            await saveKeys(key1.trim(), key2.trim());
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Ошибка сохранения ключей:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rossko-settings">
            <div className="section-header">
                <div className="section-title">
                    <Key size={20} />
                    <h3>ROSSKO API Keys</h3>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="settings-form">
                <div className="form-group">
                    <label htmlFor="key1">KEY1</label>
                    <input id="key1" type="text" value={key1} onChange={(e) => setKey1(e.target.value)} placeholder="Введите KEY1" className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="key2">KEY2</label>
                    <input id="key2" type="text" value={key2} onChange={(e) => setKey2(e.target.value)} placeholder="Введите KEY2" className="form-input" />
                </div>

                <button type="submit" className={`btn-save ${saved ? "saved" : ""}`} disabled={saving || !key1.trim() || !key2.trim()}>
                    <Save size={16} />
                    {saving ? "Сохранение..." : saved ? "Сохранено!" : "Сохранить"}
                </button>
            </form>

            <div className="info-box">
                <p>🔒 Ключи сохраняются локально на вашем устройстве и никуда не передаются</p>
            </div>
        </div>
    );
}

export default RosskoSettings;
