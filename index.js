const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')
const fs = require('fs')

const args = require('yargs').argv;
const http = require('http');
const apiObj = require('./api');

const app = express();
const { port = 8888, host = 'https://localhost:4000' } = args;
const api = new apiObj(host);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use(bodyParser.json())
app.use(async (req, res, next) => {
    const result = await api.call(req, req.body);
    res.send(result);
});

const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
}, app);

server.listen(port, () => console.log(`Proxy successfully started at ${port} to forward requests to ${host}`))
