'use strict';

const rateLimit = require('express-rate-limit');

const routeLimit = rateLimit({
	windowMs: 60000,
	max: 100,
	headers: true,
	statusCode: 429,
	message: `You can't make any more requests at the moment. Try again late`,
});

module.exports = { routeLimit };
