const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const ip = require('ip');
const args = require('yargs').argv;
const http = require('http');
const apiObj = require('./api');

const app = express();
const { port = 8888, host = 'https://localhost:4000' } = args;
const api = new apiObj(host);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use(bodyParser.json())
app.use(async (req, res, next) => {
    api.call(req, req.body).then(result =>res.send(result)).catch(err => res.send(err));
    
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Proxy successfully started at http://${ip.address()}:${port} to forward requests to ${host}`))
