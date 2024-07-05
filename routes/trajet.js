var express = require("express");
var router = express.Router();

const trajetController = require("../Controllers/trajetController");
router.get("/getTrajet/", trajetController.getALLTrajet);
router.post("/AddTrajet/", trajetController.creatTrajet);
router.delete("/deleteTrajet/", trajetController.deleteTrajet);
router.put("/updateTrajet/:id", trajetController.updateTrajet);

module.exports = router;
