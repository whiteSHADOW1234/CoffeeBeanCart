
const Order = require('../models/orderModel');
const db = require('../config/db');

const OrderService = {
    placeOrder: async (orderData) => {
        try {
            const total = orderData.cost * orderData.amount;
            const order = {
                user_name: orderData.name,
                store_name: orderData.store_name,
                coffee_type: orderData.coffee_type,
                amount: orderData.amount,
                total: total
            };
            return new Promise((resolve, reject) => {
                Order.create(order, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    },

    getAllOrders: () => {
        return new Promise((resolve, reject) => {
            Order.getAll((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    deleteOrder: (orderId) => {
        return new Promise((resolve, reject) => {
            Order.delete(orderId, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getBeanAmounts: () => {
      return new Promise((resolve, reject) => {
          const query = `
              SELECT store_name, coffee_type, SUM(amount) AS amount, SUM(total) as total
              FROM orders
              GROUP BY store_name, coffee_type;

          `

          db.query(query)
              .then(([rows]) => { resolve(rows) })
              .catch(err => reject(err))

      });
  },
};

module.exports = OrderService;