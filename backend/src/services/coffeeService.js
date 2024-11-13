const Coffee = require('../models/coffeeModel');

const CoffeeService = {
    getCoffeeInfo: () => {
        return new Promise((resolve, reject) => {
            Coffee.getAll((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
};

module.exports = CoffeeService;