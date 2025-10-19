const http = require('http');
const fs = require('fs');
const path = require('path');
/*const pool = require('./database');*/

//require('dotenv').config();
//const pool = require('./database').default;

const server = http.createServer((req, res) => {
    console.log('🔍 Запрос:', req.url, '| Метод:', req.method);

    // Обрабатываем favicon.ico ПЕРВЫМ делом
    if (req.url === '/favicon.ico') {
        console.log('⚡ Игнорируем favicon.ico');
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    // Устанавливаем правильную кодировку
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Language': 'ru'
    });

    if (req.url === '/' || req.url === '/index.html') {
        console.log('✅ Обрабатываем главную страницу');
        res.end(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Умный Склад</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    margin: 0;
                    padding: 40px;
                    color: white;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }
                h1 { text-align: center; }
                .success { 
                    background: #2ecc71; 
                    padding: 20px; 
                    border-radius: 10px;
                    text-align: center;
                    margin: 20px 0;
                }
                .nav {
                    text-align: center;
                    margin: 30px 0;
                }
                .nav a {
                    color: white;
                    background: #1890ff;
                    padding: 12px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    margin: 0 10px;
                    display: inline-block;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🏭 Умный Склад Ростелеком</h1>
                
                <div class="success">
                    <h2>✅ СЕРВЕР ЗАПУЩЕН!</h2>
                    <p>Файловая структура исправлена</p>
                </div>

                <div class="nav">
                    <a href="/">🏠 Главная</a>
                    <a href="/login">🔐 Вход в систему</a>
                </div>

                <h3>📊 Функции системы:</h3>
                <ul>
                    <li>Мониторинг роботов на складе</li>
                    <li>Контроль остатков товаров</li>
                    <li>Предиктивная аналитика ИИ</li>
                    <li>Исторические отчеты</li>
                </ul>

                <h3>🤖 Статус роботов:</h3>
                <p>Активных: 5 из 8 | Батарея: 78%</p>

                <p><strong>Студент 2 курса</strong> | ${new Date().toLocaleString('ru-RU')}</p>
            </div>
        </body>
        </html>
        `);
    }
    else if (req.url === '/login' || req.url === '/login.html') {
        console.log('✅ Обрабатываем страницу входа');

        // ПРАВИЛЬНЫЙ ПУТЬ для твоей структуры папок:
        const filePath = path.join(__dirname, 'login.html');
        console.log('🔍 Загружаем файл:', filePath);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('❌ Ошибка загрузки login.html:', err.message);
                res.end(`
                    <h1>⚠️ Ошибка загрузки страницы</h1>
                    <p>${err.message}</p>
                    <p>Путь: ${filePath}</p>
                    <a href="/">На главную</a>
                `);
            }
            else {
                console.log('✅ Файл login.html успешно загружен');
                res.end(data);
            }
        });
    }
    else if (req.url === '/dashboard' || req.url === '/dashboard.html') {
        console.log('✅ Обрабатываем основную страницу статистики');
        const filePath = path.join(__dirname, 'dashboard.html');
        console.log('🔍 Загружаем файл:', filePath);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('❌ Ошибка загрузки dashboard.html:', err.message);
                res.end(`
                    <h1>⚠️ Ошибка загрузки страницы</h1>
                    <p>${err.message}</p>
                    <p>Путь: ${filePath}</p>
                    <a href="/">На главную</a>
                `)
            }
            else {
                console.log('✅ Файл dashboard.html успешно загружен');
                res.end(data);
            }
        }
        )
    }
    else {
        // Страница не найдена
        console.log('❌ Неизвестный URL:', req.url);
        res.end(`
            <h1>❌ 404 - Страница не найдена</h1>
            <p>Запрошенная страница <strong>${req.url}</strong> не существует</p>
            <a href="/">На главную</a>
        `);
    }
});

server.listen(3000, () => {
    console.log('🚀 Сервер запущен: http://localhost:3000');
    console.log('🔐 Страница входа: http://localhost:3000/login');
    console.log('Основная страница статистики: http://localhost:3000/dashboard')
    console.log('📁 Текущая папка сервера:', __dirname);
});