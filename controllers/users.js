const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SOME_ERROR_CODE } = require("../utils/errors");

// import secret key from config.js
const { JWT_SECRET } = require("../utils/config");

// update user
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (avatar !== undefined) updateData.avatar = avatar;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("ItemIDNotFound");
      err.statusCode = 404;
      throw err;
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

// post user
const createUser = (req, res) => {
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
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
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
      SOME_ERROR_CODE(err, res);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};
module.exports = { createUser, getCurrentUser, login, updateUser };
