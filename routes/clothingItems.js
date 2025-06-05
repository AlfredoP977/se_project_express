const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
  checkIfItemDeleted,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.get("/", checkIfItemDeleted);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:id/likes", likeItem);
router.delete("/:id/likes", dislikeItem);

module.exports = router;
