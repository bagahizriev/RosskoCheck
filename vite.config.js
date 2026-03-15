import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                skipWaiting: true,
                clientsClaim: true,
                cleanupOutdatedCaches: true,
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
                navigateFallback: "index.html",
                navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-cache",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                        },
                    },
                ],
            },
            devOptions: {
                enabled: false,
            },
            includeAssets: ["favicon.ico"],
            manifest: {
                name: "ROSSKO Balance",
                short_name: "ROSSKO",
                description: "Проверка баланса на платформе ROSSKO",
                theme_color: "#2563eb",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "./",
                scope: "./",
                icons: [
                    {
                        src: "./icon-48.png",
                        sizes: "48x48",
                        type: "image/png",
                    },
                    {
                        src: "./icon-72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "./icon-96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "./icon-144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "./icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "./icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    base: "./",
});
