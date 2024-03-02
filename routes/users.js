const router = require("express").Router();
const {
  createUser,
  sendNotifications,
  getUsers,
  getUserNotifications,
} = require("../controllers/user");
router.post("/signup", createUser);
router.get("/getuser", getUsers);
router.get("/users/:userId/notifications", getUserNotifications);
router.post("/sendNotification", sendNotifications);

module.exports = router;
