const db = require('../config/db');

const Order = {
    create: (order, callback) => {
        console.log(order);
        db.query(
            'INSERT INTO orders (user_name, store_name, coffee_type, amount, total) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE amount = ?, total = ?',
            [order.user_name, order.store_name, order.coffee_type, order.amount, order.total, order.amount, order.total]
        )
            .then(([results, fields]) => callback(null, results))
            .catch(error => callback(error, null));
    },
    getAll: (callback) => {
        db.query('SELECT * FROM orders')
            .then(([results, fields]) => callback(null, results))
            .catch(error => callback(error, null));
    },
    delete: (orderId, callback) => {
        db.query('DELETE FROM orders WHERE id = ?', [orderId])
            .then(([results, fields]) => callback(null, results))
            .catch(error => callback(error, null));
    }
};

module.exports = Order;