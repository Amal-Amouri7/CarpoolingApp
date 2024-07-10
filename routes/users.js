var express = require("express");
var router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../Middleware/uploadFile");
const {requireAuthUser} = require("../Middleware/authMiddleware");
/* GET users listing. */
router.get("/getAllUser/",requireAuthUser, userController.getUsers);
router.get("/getUserById/:id",requireAuthUser, userController.getUserByID);
router.get("/getUserAuth/",requireAuthUser, userController.getUserAuth);
router.get("/getUsers18/",requireAuthUser, userController.getUsers18);
router.get("/getUsersByAge/:age",requireAuthUser, userController.getUsersByAge);
router.get("/getOrderAllUsersByAge/",requireAuthUser, userController.getOrderAllUsersByAge);
router.get('/getUserBetweenXAndY',userController.getUserBetweenXAndY );
router.get('/searchUsersByName',requireAuthUser,userController.searchUsersByName );
router.get("/login", userController.login);
router.get("/logout",requireAuthUser, userController.logout);

router.post("/addPassenger/", userController.addUserP);
router.post("/addDriver/", userController.addUserD);
router.post(
  "/addwithimage/",
  upload.single("image_user"),
  userController.addwithImg
);
router.delete("/deleteUser/",requireAuthUser, userController.deleteUser);
router.put("/updateUser/",requireAuthUser, userController.updateUser);
router.put("/updatePassword/",requireAuthUser, userController.updateUserPassword);

module.exports = router;
