const mongoose = require('mongoose');

const isMongoDBId = (key) => {
	return mongoose.Types.ObjectId.isValid(key);
};

module.exports = isMongoDBId;
