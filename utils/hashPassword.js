const bcrypt = require('bcrypt');

const saltRounds = 10;
const hashPassword = async (password) => {
	// Generate a salt at level 10 strength
	const salt = await bcrypt.genSalt(saltRounds);
	const hashPassword = await bcrypt.hash(password, salt);
	return hashPassword;
};

module.exports = hashPassword;
