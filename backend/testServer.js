const { app } = require('./src/app');

module.exports = async (port = 3002) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log(`Test server is running on port ${port}`);
            resolve(server);
        })
            .on('error', err => {
                reject(err);
            })
    });
};