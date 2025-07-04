const router = require("express").Router();
//pulls login and createUser from /controllers/users
const { login, createUser, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

// router.post("/signin", login);
// router.post("/signup", createUser);
router.get("/me", getCurrentUser);

module.exports = router;
