const { userModel, userFollowUnfollowModel } = require("../models");

const userQuery = async (filter, projection) => {
  let query = { username: filter.username };
  const data = await userModel.findOne(query, projection);
  return data;
};

module.exports = {
  userQuery,
};
