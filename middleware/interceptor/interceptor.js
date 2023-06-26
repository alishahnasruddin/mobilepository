'use strict';

// Libraries
const jwt = require('jsonwebtoken');

// Application Modules
const secretKey = 'abcsecretkeyamcdefg';

module.exports = (request, response, next) => {
	try {
		if (request.url.includes('/public')) {
			next();
		} else {
			let accessToken = request.headers.accesstoken;

			jwt.verify(accessToken, secretKey, function (error) {
				if (error) {
					response.status(401).json({
						status: false,
						message: 'you dont have access',
						data: error,
					});
				} else {
					next();
				}
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
