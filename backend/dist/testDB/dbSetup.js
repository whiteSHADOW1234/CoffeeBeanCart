const db = require('../config/db');

const setupTestDB = async () => {
    try {
        await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_TEST_DATABASE}`);
        await db.query(`USE ${process.env.MYSQL_TEST_DATABASE}`);

        await db.execute(`
        CREATE TABLE IF NOT EXISTS coffee_info (
            store_name VARCHAR(255) CHARACTER SET utf8mb4,
            coffee_type VARCHAR(255) CHARACTER SET utf8mb4,
            cost DECIMAL(10, 2),
            PRIMARY KEY (store_name, coffee_type)
        ) CHARACTER SET utf8mb4;
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS orders (
            user_name VARCHAR(255) CHARACTER SET utf8mb4,
            store_name VARCHAR(255) CHARACTER SET utf8mb4,
            coffee_type VARCHAR(255) CHARACTER SET utf8mb4,
            amount INT,
            total DECIMAL(10, 2),
            UNIQUE KEY (user_name, store_name, coffee_type),
            PRIMARY KEY (user_name, store_name, coffee_type)
            ) CHARACTER SET utf8mb4;
        `);

        // Use parameterized queries for data insertion
        const values = [
            ['George\'s Coffee', '淺中焙 衣索比亞 藝妓村 夏亞區 果利藝妓 日曬 綠標', 700],
            ['George\'s Coffee', '淺中焙 肯亞 祈安布區 魯埃拉莊園 日曬', 530],
            ['George\'s Coffee', '淺中焙 衣索比亞 谷吉 烏拉嘎鎮 紅蜜G1', 510],
            ['George\'s Coffee', '淺中焙 衣索比亞 耶加雪夫 沃卡 荔枝處理廠 水洗G1 EP117', 510],
            ['MR.DODO', '肯亞 ＜FAQ精選 AA 水洗＞', 400],
            ['MR.DODO', '蘇門答臘 ＜迦祐曼特寧 GAYO 水洗＞', 400],
            ['MR.DODO', '新幾內亞 ＜天堂鳥莊園 Sigri 水洗＞', 400],
            ['MR.DODO', '衣索比亞 ＜耶家雪菲 潔蒂普 Gedeb 水洗＞', 400],
            ['MR.DODO', '肯亞 ＜新奇利帝 New Kiriti 水洗＞', 400],
            ['Warm Air', '〖 衣索比亞 〗阿貝果娜 Fafe 芳福處理廠 74110 水洗', 300],
            ['Warm Air', '〖 衣索比亞 〗阿貝果娜 魯穆達莫 高冷地濃縮乾燥日曬', 300],
            ['Warm Air', '〖 衣索比亞 〗 谷吉 罕貝拉 伊莎姆 74112 2024 T.O.H 水洗組 冠軍 ！', 380],
            ['Warm Air', '〖 TAIWAN 〗 台灣 那瑪夏 落山風 日曬', 650],
            ['Warm Air', '〖 Blend 〗 - 冬季配方 暖冬', 370]
        ];

        const query = "INSERT INTO coffee_info (store_name, coffee_type, cost) VALUES ?";


        await db.query(query, [values]);

    } catch (error) {
        console.error("Failed to set up the database", error);
    }
};

const teardownTestDB = async () => {
    try {
        await db.query(`DROP DATABASE IF EXISTS ${process.env.MYSQL_TEST_DATABASE}`);
        await db.end();

    } catch (error) {
        console.error("Failed to drop test database:", error);
    }
}



module.exports = { setupTestDB, teardownTestDB };