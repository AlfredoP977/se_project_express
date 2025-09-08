const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// import secret key from config.js
const { JWT_SECRET } = require("../utils/config");

// import error func
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../middlewares/errors/IndexErrors");

// update user
const updateUser = (req, res, next) => {
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
      return next(new NotFoundError("ItemIDNotFound"));
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
};

// post user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return next(new BadRequestError("Missing required fields"));
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("User with this email already exists"));
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
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("missing email or password"));
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
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      return next(new NotFoundError("ItemIDNotFound"));
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};
module.exports = { createUser, getCurrentUser, login, updateUser };
