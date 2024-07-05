const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  matricule: { type: String, required: true },
  photo_car: { type: String, required: false, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
