// const mysql = require('mysql2');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '3307',   // 3307 For Docker; 3306 for local
  user: process.env.MYSQL_USER || 'newuser',
  password: process.env.MYSQL_PASSWORD || 'new_user',
  database: process.env.MYSQL_DATABASE || 'coffeebeanorders',
  // database: process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_DATABASE : process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  queueLimit: 0
});

// acquire connection and set database if none selected
// pool.getConnection()
//     .then(conn => {
//         if (!conn.config.database) {
//             return conn.query(`USE ${process.env.MYSQL_DATABASE}`)
//                 .then(() => conn.release()); // IMPORTANT: Release the connection
//         }
//         else {
//             conn.release()
//             return Promise.resolve()
//         }
//     })
//     .catch(err => {
//         console.error('Error selecting database:', err);
//         // Handle the error appropriately (e.g., exit the process)
//     });



module.exports = pool;