import sharp from "sharp";
import fs from "fs";
import path from "path";

// Размеры иконок, которые нужно сгенерировать
const iconSizes = [
    { name: "icon-16.png", size: 16 },
    { name: "icon-32.png", size: 32 },
    { name: "icon-48.png", size: 48 },
    { name: "icon-72.png", size: 72 },
    { name: "icon-96.png", size: 96 },
    { name: "icon-144.png", size: 144 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon-120x120.png", size: 120 },
    { name: "apple-touch-icon-152x152.png", size: 152 },
    { name: "apple-touch-icon-180x180.png", size: 180 },
];

async function generateIcons() {
    const svgPath = "public/icon.svg";
    const publicDir = "public";

    // Проверяем, существует ли SVG файл
    if (!fs.existsSync(svgPath)) {
        console.error("❌ Файл public/icon.svg не найден!");
        console.log("📝 Поместите ваш SVG файл в public/icon.svg и запустите скрипт снова.");
        return;
    }

    console.log("🎨 Генерация иконок из SVG...");

    try {
        // Генерируем PNG иконки
        for (const icon of iconSizes) {
            await sharp(svgPath).resize(icon.size, icon.size).png().toFile(path.join(publicDir, icon.name));

            console.log(`✅ Создана ${icon.name} (${icon.size}x${icon.size})`);
        }

        // Генерируем favicon.ico (мультиразмерный)
        const faviconSizes = [16, 32, 48];
        const faviconBuffers = [];

        for (const size of faviconSizes) {
            const buffer = await sharp(svgPath).resize(size, size).png().toBuffer();
            faviconBuffers.push(buffer);
        }

        // Создаем ICO файл (упрощенная версия - просто берем 32x32)
        await sharp(svgPath).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32.png"));

        console.log("✅ Создан favicon-32.png (для favicon.ico используйте онлайн конвертер)");

        console.log("");
        console.log("🎉 Все иконки успешно сгенерированы!");
        console.log("");
        console.log("📋 Созданные файлы:");
        iconSizes.forEach((icon) => {
            console.log(`   - ${icon.name}`);
        });
        console.log("   - favicon-32.png");
        console.log("");
        console.log("💡 Для создания favicon.ico используйте онлайн конвертер:");
        console.log("   https://convertio.co/png-ico/");
        console.log("   Загрузите favicon-32.png и конвертируйте в favicon.ico");
    } catch (error) {
        console.error("❌ Ошибка при генерации иконок:", error);
    }
}

generateIcons();
