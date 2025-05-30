const Item = require("../models/items");

//get /Items
const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

//post user
const createItem = (req, res) => {
  const { name, weather, imageUrl, owner, likes, createdAt } = req.body;
  Item.create({ name, weather, imageUrl, owner, likes, createdAt })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  Item.findById(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      } else {
        console.error(err);
        return res.status(500).send({ message: err.message });
      }
    });
};

module.exports = { getItems, createItem, deleteItem };
