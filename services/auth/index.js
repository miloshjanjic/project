require('dotenv').config();
require('../../db/index');
const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');

api.use(express.json());

api.use(jwt({
  secret: process.env.JWT_KEY,
  algorithms: ['HS256']
}).unless({
  path: [
    process.env.PATH_REGISTER,
    process.env.PATH_LOGIN
  ]
}));

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

api.use(process.env.PATH_AUTH, router);

api.listen(process.env.PORT_AUTH, err => {
  if (err) {
    return console.log('Error happened while starting the auth service: ', err);
  }
  console.log('Auth service succesfully started on port', process.env.PORT_AUTH);
});