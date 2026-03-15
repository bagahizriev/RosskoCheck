import React, { useState, useEffect } from "react";
import { getKeys, saveKeys } from "../db";
import "./SettingsPage.css";

function SettingsPage() {
    const [key1, setKey1] = useState("");
    const [key2, setKey2] = useState("");
    const [saving, setSaving] = useState(false);

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
        } catch (error) {
            console.error("Ошибка сохранения ключей:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="settings-page">
            <h1>Rossko API Keys</h1>

            <form onSubmit={handleSubmit} className="settings-form">
                <input type="text" value={key1} onChange={(e) => setKey1(e.target.value)} placeholder="KEY1" className="form-input" />

                <input type="text" value={key2} onChange={(e) => setKey2(e.target.value)} placeholder="KEY2" className="form-input" />

                <button type="submit" className="btn-save" disabled={saving || !key1.trim() || !key2.trim()}>
                    {saving ? "Сохранение..." : "Сохранить"}
                </button>
            </form>
        </div>
    );
}

export default SettingsPage;
