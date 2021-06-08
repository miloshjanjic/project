require('dotenv').config();
require('../../db');
const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');
// const config = require('../../config/index');

api.use(express.json());

api.use(jwt({
  secret: process.env.JWT_KEY,
  algorithms: ['HS256']
}));

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

api.use(process.env.PATH_RECIPES, router);

api.listen(process.env.PORT_RECIPES, err => {
  if (err) {
    return console.log('Error happened while starting the recipes service: ', err);
  }
  console.log('Recipes service successfully started on port', process.env.PORT_RECIPES);
});