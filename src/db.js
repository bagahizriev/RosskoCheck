import { openDB } from "idb";

const DB_NAME = "rossko-balance";
const STORE_NAME = "settings";

async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });
}

export async function saveKeys(key1, key2) {
    const db = await getDB();
    await db.put(STORE_NAME, { key1, key2 }, "apiKeys");
}

export async function getKeys() {
    const db = await getDB();
    return await db.get(STORE_NAME, "apiKeys");
}

export async function clearKeys() {
    const db = await getDB();
    await db.delete(STORE_NAME, "apiKeys");
}
