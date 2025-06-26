const router = require("express").Router();
//pulls login and createUser from /controllers/users
const { login, createUser } = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
