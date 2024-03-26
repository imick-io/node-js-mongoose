const User = require("../models/user");

exports.all = async (req, res, next) => {
  return res.json(await User.find());
};
