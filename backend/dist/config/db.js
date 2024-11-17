require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,   // 3307 For Docker; 3306 for local
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  queueLimit: 0
});

console.log('DB_HOST:', process.env.DB_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('DB_PORT:', process.env.DB_PORT);



module.exports = pool;