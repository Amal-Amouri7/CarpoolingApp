var express = require("express");
var router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../Middleware/uploadFile");
/* GET users listing. */
router.get("/getAllUser/", userController.getUsers);
router.get("/getUserById/:id", userController.getUserByID);
router.post("/addUser/", userController.addUserC);
router.post(
  "/addwithimage/",
  upload.single("image_user"),
  userController.addUser
);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put("/updateUser/:id", userController.updateUserC);
router.put("/updatePassword/:id", userController.updateUserPassword);

module.exports = router;
