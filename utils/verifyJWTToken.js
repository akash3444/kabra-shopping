const jwt = require('jsonwebtoken');
const {SECRETKEY} = require('./env')

const secret = SECRETKEY;

const verifyJWTToken = (token) => {
	const verifyToken = jwt.verify(token, secret);
	return verifyToken;
};

module.exports = verifyJWTToken;
