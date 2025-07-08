const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");

router.get("/", getItems);
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:id/likes", auth, likeItem);
router.delete("/:id/likes", auth, dislikeItem);

module.exports = router;
