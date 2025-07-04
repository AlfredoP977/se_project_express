//uses router from express to connect files
const router = require("express").Router();
//pulls this code to connect to error from errors.js
const { NOT_FOUND } = require("../utils/errors");
// connects to user router
const userRouter = require("./users");
//connects to item router
const clothingItemsRouter = require("./clothingItems");

const auth = require("../middlewares/auth");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemsRouter);

//reports errors
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
