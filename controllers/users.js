const User = require("../models/user");
const { SOME_ERROR_CODE } = require("../utils/errors");

//why is bycrytpt not working
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//import secret key from config.js
const { JWT_SECRET } = require("../utils/config");

// get /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};
const getUser = (req, res) => {
  const { userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

// post user
const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password)
    .then((hash) =>
      User.create({
        name: req.body.name,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser, login };
