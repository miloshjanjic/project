const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = {
  register: async (req, res) => {
    try {
      if (!req.body.password || req.body.password != req.body.confirmation_password) {
        return res.status(400).send({
          error: true,
          message: 'Bad request.Passwords do not match'
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({
          error: true,
          message: 'Bad request.User exists with the provided email. '
        });
      }

      req.body.password = bcrypt.hashSync(req.body.password);

      await User.create(req.body);

      res.status(201).send({
        error: false,
        message: 'User register'
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).send({
          error: true,
          message: 'No user with the provided email'
        });
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          error: true,
          message: 'Incorect password'
        });
      }

      const payload = {
        id: user._id,
        email: user.email,
        full_name: `${user.firstName}${user.lastName}`
      }

      const token = jwt.sign(payload, config.get('auth').jwt_key, {
        expiresIn: '30m'
      });

      res.send({
        error: false,
        message: 'JWT succesfully generated',
        token: token
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message
      });
    }
  },

  refresh_token: (req, res) => {
    const payload = {
      id: req.user.id,
      email: req.user.email,
      full_name: `${user.firstName}${user.lastName}`
    };

    const token = jwt.sign(payload, config.get('auth').jwt_key, {
      expiresIn: '30m'
    });

    res.status(200).send({
      error: false,
      message: 'JWT successfully refreshed',
      token
    });
  }
};