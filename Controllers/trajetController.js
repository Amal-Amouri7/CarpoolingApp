const Trajet = require("../Models/trajetModel");
const User = require("../Models/userModel");

module.exports.creatTrajet = async (req, res) => {
  try {
    const {
      conducteur,
      depart,
      destination,
      dateDepart,
      placesDisponibles,
      prix,
    } = req.body;
    const newTrajet = new Trajet({
      conducteur,
      depart,
      destination,
      dateDepart,
      placesDisponibles,
      prix,
    });
    await newTrajet.save();
    res
      .status(201)
      .json({ message: "Trajet créé avec succès.", trajet: newTrajet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getALLTrajet = async (req, res) => {
  try {
    const trajet = await trajetModel.find();
    if (trajet.length === 0 && !trajet) {
      throw new Error("No trajet found");
    }
    res.status(201).json({ trajet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteTrajet = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrajet = await Trajet.findByIdAndDelete(id);

    if (!deletedTrajet) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    res.status(200).json({ message: "Réservation supprimée avec succès." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateTrajet = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      conducteur,
      depart,
      destination,
      dateDepart,
      placesDisponibles,
      prix,
    } = req.body;
    const checkIfTrajetExists = await Tajet.findById(id);
    if (!checkIfTrajetExists) {
      throw new Error("Trajet not found !");
    }
    const updatedTrajet = await Trajet.findByIdAndUpdate(
      id,
      {
        $set: {
          conducteur,
          depart,
          destination,
          dateDepart,
          placesDisponibles,
          prix,
        },
      },
      { new: true }
    );
    if (!updatedTrajet) {
      return res.status(404).json({ message: "Trajet non trouvé." });
    }
    res
      .status(200)
      .json({
        message: "Trajet mis à jour avec succès.",
        trajet: updatedTrajet,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
