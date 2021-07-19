'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const baseRouter = require('./src/routes/index')

app.use(bodyParser.json({ strict: false }))

// set CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
        'Origin, Content-Type, X-Auth-Token, If-Match, Authorization')
    res.header('Access-Control-Expose-Headers', 'ETag')
    next()
})

app.use('/v1/data', baseRouter)
// up status
app.get('/', function (req, res) {
    res.send('ping')
})
const APP_PORT_NO = process.env.APP_PORT_NO ? process.env.APP_PORT_NO : 7777;

module.exports.handler = app.listen(APP_PORT_NO, function () {
    console.log("server started at  " + APP_PORT_NO);
    console.log("Please Navigate to http://localhost:" + APP_PORT_NO.toString());
});

