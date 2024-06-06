const express = require("express");
const os = require("os");

module.exports.getOSInformations = (req, res) => {
  try {
    const osInformations = { hostname: os.hostname(), type: os.type() };
    if (!osInformations) {
      throw new Error("there is no information from your");
    }
    res.status(200).json(osInformations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.osCpus = (req, res) => {
  try {
    const osCpus = os.cpus();
    if (!osCpus) {
      throw new Error("no cpus was found!");
    }
    res.json(osCpus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.osCpusByID = (req, res) => {
  try {
    const { id } = req.params;
    const osCpus = os.cpus();

    if (!Number.isInteger(parseInt(id))) {
      throw new Error("you must provide a Number!");
    }

    if (!osCpus) {
      throw new Error("no cpus was found!");
    }

    if (id < 0 || id > osCpus.length - 1) {
      throw new Error("you must provide a valid id");
    }

    res.json(osCpus[id]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
