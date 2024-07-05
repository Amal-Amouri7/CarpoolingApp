const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema(
  {
    pointDepart: { type: String, required: true },
    pointArrivee: { type: String, required: true },
    dateDepart: { type: Date, required: true },
    heureDepart: { type: String, required: true },
    dureeEstimee: { type: String, required: true },
    conducteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur", // Référence au modèle Utilisateur
      required: true,
    },
    placesDisponibles: { type: Number, required: true },
    prixPlace: { type: Number, required: true },
    statut: {
      type: String,
      enum: ["en cours", "complet", "annulé", "terminé"],
      default: "en cours",
    },
    commentaires: [
      {
        auteur: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Utilisateur",
          required: true,
        },
        texte: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Trajet = mongoose.model("Trajet", trajetSchema);
module.exports = Trajet;
