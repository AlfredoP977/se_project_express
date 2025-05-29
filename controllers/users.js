const User = require("../models/user");

//get /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(201).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

//post user
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(500).send({ message: err.message });
      }

      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser };
