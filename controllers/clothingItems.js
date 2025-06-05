const ClothingItems = require("../models/clothingItems");
const { SOME_ERROR_CODE } = require("../utils/errors");

// get Items
const getItems = (req, res) => {
  ClothingItems.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

// post user
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

const deleteItem = (req, res) => {
  console.log("id for delete item", req.params.itemId);
  ClothingItems.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      const error = new Error("ItemIDNotFound");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

const likeItem = (req, res) => {
  console.log("req.params.itemId", req.params.itemId);
  console.log("req.params", req.params);
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
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

const dislikeItem = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID Not Found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      SOME_ERROR_CODE(err, res);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
