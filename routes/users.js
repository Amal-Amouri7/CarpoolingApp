var express = require("express");
var router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../Middleware/uploadFile");
/* GET users listing. */
router.get("/getAllUser/", userController.getUsers);
router.get("/getUserById/:id", userController.getUserByID);
router.get("/login", userController.login);

router.post("/addPassenger/", userController.addUserP);
router.post("/addDriver/", userController.addUserD);
router.post(
  "/addwithimage/",
  upload.single("image_user"),
  userController.addwithImg
);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put("/updateUser/:id", userController.updateUser);
router.put("/updatePassword/:id", userController.updateUserPassword);

module.exports = router;
