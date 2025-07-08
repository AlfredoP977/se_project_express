const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SOME_ERROR_CODE } = require("../utils/errors");

// import secret key from config.js
const { JWT_SECRET } = require("../utils/config");

// post user
const createUser = (req, res) => {
  console.log("Incoming request body:", req.body);

  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    const err = "Missing required fields";
    return SOME_ERROR_CODE(err, res);
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const err = new Error("Email already exists");
        err.statusCode = 409;
        throw err;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      // password is already declared fix this
      const { password, ...userWithoutPassword } = user.toObject();
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      console.log("err", err);
      SOME_ERROR_CODE(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = "missing email or password";
    return SOME_ERROR_CODE(err, res);
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      // authentication error
      console.log(" message: err.message", err.message);
      console.log(" message: err.name", err.name);
      res.status(401).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  console.log("id?", req.user._id);
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};
module.exports = { createUser, getCurrentUser, login };
