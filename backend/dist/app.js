require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const db = require('./config/db');
const path = require('path');
// const { setupTestDB } = require('./testDB/dbSetup');


const app = express();

const port = process.env.PORT || 3309;


app.use(cors());
app.use(bodyParser.json());

app.use(process.env.API_BASE_URL, orderRoutes);
app.use(express.static(path.join(__dirname, '..','..', 'frontend', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','..', 'frontend', 'build', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// close connection to database after queries have been sent
process.on('SIGINT', () => {
    console.log('Server closed.');
    db.end();
    server.close();
});


module.exports = { server, app };