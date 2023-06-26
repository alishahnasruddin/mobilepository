'use strict';

const loginRoute = require('express').Router();
const loginController = require('../controllers/authentication');
module.exports = loginRoute.post('/public/login', loginController.authentication);
module.exports = loginRoute.post('/public/signup', loginController.signup);
module.exports = loginRoute.get('/protected ', loginController.protected);
