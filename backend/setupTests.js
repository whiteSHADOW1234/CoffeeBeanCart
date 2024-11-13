// const db = require('./src/config/db');
// const { app } = require('./src/app');  // Import your Express app



// module.exports = async () => {


//     if (process.env.NODE_ENV !== 'test') {
//         console.log(`Not running in test environment, NODE_ENV=${process.env.NODE_ENV}. Skipping setup.`)
//         return;
//     }



//     try {


//         await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_TEST_DATABASE}`);

//         await db.query(`USE ${process.env.MYSQL_TEST_DATABASE}`);



//         await db.query(`
//         CREATE TABLE IF NOT EXISTS coffee_info (
//             store_name VARCHAR(255),
//             coffee_type VARCHAR(255),
//             cost DECIMAL(10, 2),
//             PRIMARY KEY (store_name, coffee_type)
//         );
//         `);

//         await db.query(`
//             CREATE TABLE IF NOT EXISTS orders (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             user_name VARCHAR(255),
//             store_name VARCHAR(255),
//             coffee_type VARCHAR(255),
//             amount INT,
//             total DECIMAL(10, 2)
//             );
//         `);


//         await db.query(`
//         INSERT INTO coffee_info (store_name, coffee_type, cost) 
//         VALUES 
//         ('George\'s Coffee', '淺中焙 衣索比亞 藝妓村 夏亞區 果利藝妓 日曬 綠標', 700),
//         ('George\'s Coffee', '淺中焙 肯亞 祈安布區 魯埃拉莊園 日曬', 530),
//         ('George\'s Coffee', '淺中焙 衣索比亞 谷吉 烏拉嘎鎮 紅蜜G1', 510);
//         `);

//         // Start the server for integration tests AFTER setting up the test DB
//         global.server = app.listen(3002); // Use a different port for testing


//     } catch (error) {
//         console.log("Error while trying to create or use the testing database.", error)
//     }




// };