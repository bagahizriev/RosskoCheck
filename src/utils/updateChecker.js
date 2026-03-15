// Утилита для проверки обновлений приложения
export class UpdateChecker {
    constructor() {
        this.currentVersion = null;
        this.checkInterval = null;
    }

    async getCurrentVersion() {
        try {
            const response = await fetch("/version.json?t=" + Date.now());
            return await response.json();
        } catch (error) {
            console.error("Ошибка получения версии:", error);
            return null;
        }
    }

    async checkForUpdates() {
        try {
            const newVersion = await this.getCurrentVersion();

            if (!this.currentVersion) {
                this.currentVersion = newVersion;
                return false;
            }

            // Сравниваем время сборки
            const currentBuildTime = new Date(this.currentVersion.buildTime);
            const newBuildTime = new Date(newVersion.buildTime);

            if (newBuildTime > currentBuildTime) {
                console.log("Найдено обновление:", newVersion);
                return true;
            }

            return false;
        } catch (error) {
            console.error("Ошибка проверки обновлений:", error);
            return false;
        }
    }

    startPeriodicCheck(intervalMs = 300000) {
        // 5 минут по умолчанию
        this.stopPeriodicCheck();

        this.checkInterval = setInterval(async () => {
            const hasUpdate = await this.checkForUpdates();
            if (hasUpdate) {
                this.notifyUpdate();
            }
        }, intervalMs);
    }

    stopPeriodicCheck() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    notifyUpdate() {
        if (confirm("Доступна новая версия приложения. Обновить сейчас?")) {
            this.forceUpdate();
        }
    }

    forceUpdate() {
        // Очищаем все кэши
        if ("caches" in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }

        // Перезагружаем страницу
        window.location.reload(true);
    }
}

export const updateChecker = new UpdateChecker();
