const router = require("express").Router();
// pulls login and createUser from /controllers/users
const { getCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", getCurrentUser);

module.exports = router;
