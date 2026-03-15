// Замените на URL вашего Cloudflare Worker
const PROXY_URL = "https://rossko-proxy.bagahizriev.workers.dev";

export async function getBalance(key1, key2) {
    try {
        const response = await fetch(PROXY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ key1, key2 }),
        });

        if (!response.ok) {
            throw new Error("Ошибка при получении данных");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || "Ошибка API");
        }

        return {
            balance: data.balance,
            type: data.type,
            currency: data.currency,
            customers: data.customers || [],
        };
    } catch (error) {
        throw new Error(error.message || "Не удалось получить баланс");
    }
}
