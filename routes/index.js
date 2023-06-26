const express = require('express');
const router = express.Router();
const loginRoutes = require('./login.routes');

/* GET home page. */

module.exports = function route(appServer) {
	const publicPrefix = '/api/v1/public';
	const Prefix = '/api/v1';

	appServer.use(publicPrefix + '/user/login', loginRoutes);
};
