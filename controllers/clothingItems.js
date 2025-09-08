const ClothingItems = require("../models/clothingItems");
//import error func
const { NotFoundError, ForbiddenError } = require("../middlewares/errors");

// get Items
const getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};

// post item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  ClothingItems.findById(req.params.itemId)
    .orFail(() => {
      return next(new NotFoundError("ItemIDNotFound"));
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(new ForbiddenError("DeletedAnotherUserItem"));
      }
      return item.deleteOne().then(() => res.status(200).send(item));
    })
    .catch((err) => {
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      return next(new NotFoundError("ItemIDNotFound"));
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      return next(new NotFoundError("ItemIDNotFound"));
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
