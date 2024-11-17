const db = require('../config/db');

const Coffee = {
    getAll: (callback) => {
        db.query('SELECT * FROM coffee_info')
            .then(([results, fields]) => callback(null, results))
            .catch(error => callback(error, null));

    },
};

module.exports = Coffee;