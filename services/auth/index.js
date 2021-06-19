require('../../db/index');
const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');
const config = require('../../config/index');
const cors = require('cors');

api.use(express.json());
api.use(cors());

api.use(jwt({
  secret: config.get('auth').jwt_key,
  algorithms: ['HS256']
}).unless({
  path: [
    config.get('path').register,
    config.get('path').login
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

api.use(config.get('path').auth, router);

api.listen(config.get('ports').auth, err => {
  if (err) {
    return console.log('Error happened while starting the auth service: ', err);
  }
  console.log('Auth service succesfully started on port', config.get('ports').auth);
});