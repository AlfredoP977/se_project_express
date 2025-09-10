const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");
const {
  validateItemId,
  validateId,
  validateClothingItem,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateClothingItem, createItem);
router.delete("/:itemId", auth, validateItemId, deleteItem);
router.put("/:id/likes", auth, validateId, likeItem);
router.delete("/:id/likes", auth, validateId, dislikeItem);

module.exports = router;
