var express = require("express");
var router = express.Router();

const reservationController = require("../Controllers/reservationController");
router.get("/getReservations/", reservationController.getReservations);
router.post("/AddReservation/", reservationController.AddReservation);
router.delete("/deleteReservation/", reservationController.deleteReservation);
router.put("/updateReservation/:id", reservationController.updateReservation);

module.exports = router;
