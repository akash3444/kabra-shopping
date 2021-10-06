const bcrypt = require('bcrypt');

const comparePassword = (passwordAttempt, hashedPassword) => {
	return bcrypt.compare(passwordAttempt, hashedPassword);
};

module.exports = comparePassword;