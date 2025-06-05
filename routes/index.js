const router = require("express").Router();
const DEFAULT = require("../utils/errors");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(DEFAULT).send({ message: "Router not found" });
});

module.exports = router;
