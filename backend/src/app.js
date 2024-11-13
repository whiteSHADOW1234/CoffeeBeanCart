const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const db = require('./config/db');
const { setupTestDB } = require('./testDB/dbSetup');


const app = express();

const port = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);

setupTestDB();

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// close connection to database after queries have been sent
process.on('SIGINT', () => {

    db.end();
    server.close();
});


module.exports = { server, app };