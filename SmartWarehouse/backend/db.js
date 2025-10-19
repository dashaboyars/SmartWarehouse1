const { Pool } = require('pg');

// Настройки подключения
const pool = new Pool({
    user: 'dsshbrs',         // пользователь PostgreSQL
    host: 'localhost',      // адрес сервера
    database: 'smart_warehouse',       // имя базы данных
    password: 'Lfif2006!', // пароль
    port: 5432,             // порт PostgreSQL
});

// Проверка подключения
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Ошибка подключения к БД', err);
    }
    console.log('Подключение к базе данных успешно!');
    release();
});

module.exports = pool;
