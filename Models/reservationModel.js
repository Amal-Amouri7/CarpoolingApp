const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
    },
    trajet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trajet",
      required: true,
    },
    nombrePlace: Number,
    dateReservation: { type: Date, default: Date.now },
    statut: {
      type: String,
      enum: ["confirmée", "annulée"],
      default: "confirmée",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
