/**
 * @description server file with defined API's
 * @author Manav Sharma
 * @since 21 December 2020
 */
const express = require('express');
const services = require('./Services/task');

const bodyParser = require('body-parser');

require('dotenv').config({ path: '/.env'});

const app = express();
app.use(bodyParser.json());
const port = parseInt(process.env.PORT, 10);

app.get('/ping', async (req, res) => {
    res.send('PONG');
});

app.post('/task/:action', services.task );


app.listen(port, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});