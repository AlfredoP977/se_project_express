const User = require("../models/user");
const { SOME_ERROR_CODE } = require("../utils/errors");
// get /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

// post user
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

module.exports = { getUsers, createUser, getUser };
