// uses router from express to connect files
const router = require("express").Router();
// pulls this code to connect to error from errors.js
const { NotFoundError } = require("../middlewares/error-handler");
// connects to user router
const userRouter = require("./users");
// connects to item router
const clothingItemsRouter = require("./clothingItems");

const auth = require("../middlewares/auth");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemsRouter);

// reports errors
router.use((req, res) => {
  return next(new NotFoundError("Router not found"));
});

module.exports = router;
