const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

//memory
const users = [];
const failedLoginAttempts = {};
const blockedIPs = {};

module.exports.authentication = (req, res) => {
	try {
		const { username, password } = req.body;
		const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

		if (blockedIPs[ip]) {
			return res.status(403).json({ result: null, status: false, msg: 'Iip Address block' });
		}
		const failedAttempts = failedLoginAttempts[ip] || [];
		const now = Date.now();
		const fiveMinutesAgo = now - 5 * 60 * 1000;
		const recentFailedAttempts = failedAttempts.filter((time) => time > fiveMinutesAgo);

		if (recentFailedAttempts.length >= 5) {
			blockedIPs[ip] = true;
			setTimeout(() => {
				delete blockedIPs[ip];
			}, 60 * 60 * 1000); // Unblock after 1 hour
			return res.status(403).json({ error: 'IP address blocked' });
		}

		const user = users.find((user) => user.username === username);
		if (!user) {
			failedLoginAttempts[ip] = [...failedAttempts, now];

			return res.status(401).json({ result: null, status: false, msg: 'Invalid username or password' });
		}
		const passwordMatch = bcrypt.compareSync(password, user.password);
		if (!passwordMatch) {
			failedLoginAttempts[ip] = [...failedAttempts, now];

			return res.status(401).json({ result: null, status: false, msg: 'Invalid username or password' });
		}
		delete failedLoginAttempts[ip];

		const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

		res.status(200).json({ result: token, status: true, msg: 'success' });
	} catch (error) {
		res.status(500).json({ result: null, status: false, msg: 'failed' });
	}
};
module.exports.signup = (req, res) => {
	try {
		const { username, password } = req.body;
		const existingUser = users.find((user) => user.username === username);
		if (existingUser) {
			return res.status(409).json({ error: 'Username already exists' });
		}
		// Hash the password
		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);
		const newUser = {
			username,
			password: hashPass,
		};
		users.push(newUser);

		res.status(200).json({ result: null, status: true, msg: 'user created' });
	} catch (error) {
		res.status(500).json({ result: null, status: false, msg: 'failed' });
	}
};

module.exports.protected = (req, res) => {
	try {
		res.status(200).json({ result: null, status: true, msg: 'protected api' });
	} catch (error) {
		res.status(500).json({ result: null, status: false, msg: 'failed' });
	}
};
