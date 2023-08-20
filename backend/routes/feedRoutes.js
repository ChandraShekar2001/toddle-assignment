const router = require("express").Router();
const { teacherFeed, studentFeed } = require("../controllers/feedController");
const { isAuthenticated, isTeacher } = require("../middleware/auth");

router.route("/teacherFeed").get(isAuthenticated, isTeacher, teacherFeed);
router.route("/studentFeed").get(isAuthenticated, studentFeed);

module.exports = router;
