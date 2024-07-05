const Reservation = require("../Models/reservationModel");
const Trajet = require("../Models/trajetModel");

exports.AddReservation = async (req, res) => {
  try {
    const { trajetId, passengerId } = req.body;
    const newreservation = new Reservation({
      trajet: trajetId,
      passenger: passengerId,
    });
    await newreservation.save();
    Trajet.placesDisponibles -= 1;
    await Trajet.save();
    res.status(201).json({
      message: "Réservation créée avec succès.",
      reservation: newReservation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }
    const trajetId = Reservation.trajet;
    const trajet = await Trajet.findById(trajetId);
    if (!trajet) {
      return res.status(404).json({ message: "Trajet non trouvée." });
    }
    trajet.placesDisponibles += Reservation.nombrePlace;
    await Reservation.findByIdAndDelete(id);
    await trajet.save();

    res.status(200).json({ message: "Réservation supprimée avec succès." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const { passenger, trajet, nombrePlace, statut } = req.body;
    const checkIfReservationExists = await Reservation.findById(id);
    if (!checkIfReservationExists) {
      throw new Error("Reservation not found !");
    }
    const trajetId = checkIfReservationExists.trajet;
    const checkIfTrajetExists = await Trajet.findById(trajetId);
    if (!checkIfTrajetExists) {
      return res.status(404).json({ message: "Trajet non trouvé." });
    }
    const placesDifference = checkIfReservationExists.nombrePlace - nombrePlace;
    updated = await Reservation.findByIdAndUpdate(
      id,
      {
        $set: { passenger, trajet, nombrePlace, statut },
      },
      { new: true } // si elle n'existe pas elle sera ajoutée
    );
    if (placesDifference !== 0) {
      checkIfTrajetExists.placesDisponibles += placesDifference;
      await checkIfTrajetExists.save();
    }
    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getReservations = async (req, res) => {
  try {
    const reservation = await reservationModel.find();
    if (reservation.length === 0 && !reservation) {
      throw new Error("No users found");
    }
    res.status(201).json({ reservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
