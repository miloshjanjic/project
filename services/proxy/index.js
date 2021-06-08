// const config = require('../../config/index');
require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use(process.env.PATH_AUTH, proxy(
    `http://localhost:${process.env.PORT_AUTH}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${process.env.PORT_AUTH}${process.env.PATH_AUTH}${req.url}`
        }
    }
));

app.use(process.env.PATH_USERS, proxy(
    `http://localhost:${process.env.PORT_USERS}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${process.env.PORT_USERS}${process.env.PATH_USERS}${req.url}`
        }
    }
));

app.use(process.env.PATH_RECIPES, proxy(
    `http://localhost:${process.env.PORT_RECIPES}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${process.env.PORT_RECIPES}${process.env.PATH_RECIPES}${req.url}`
        }
    }
));

app.use(process.env.PATH_STORAGE, proxy(
    `http://localhost:${process.env.PORT_STORAGE}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${process.env.PORT_STORAGE}${process.env.PATH_STORAGE}${req.url}`
        }
    }
));

app.use('/', express.static(`${__dirname}/../../public/build`));

const PORT = process.env.PORT || process.env.PORT_PROXY;

app.listen(PORT, err => {
    if (err) {
        return console.log('Could not start proxy service', err);
    }
    console.log('Proxy service successfully started');
});