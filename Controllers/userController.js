const userModel = require("../Models/userModel");

module.exports.addUserC = async (req, res) => {
  const { name, age, email, password } = req.body;
  const role = "client";
  console.log(req.body);
  try {
    // const user = await userModel.create({
    //   name, age, email, password
    // })
    const user = new userModel({
      name,
      age,
      email,
      password,
      role,
    });
    const AddedUser = await user.save();

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0 && !users) {
      throw new Error("No users found");
    }
    res.status(201).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !");
    }
    await userModel.findByIdAndDelete(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUserC = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, password } = req.body;
    const role = "client";
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !");
    }
    updated = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { name, age, email, password },
      },
      { new: true } // si elle n'existe pas elle sera ajoutée
    );

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const role = "client";
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !");
    }
    updated = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { password },
      },
      { new: true } // si elle n'existe pas elle sera ajoutée
    );

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userModel.findById(id);
    if (users.length === 0 && !users) {
      throw new Error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.addUser = async (req, res) => {
  const { name, age, email, password } = req.body;
  const { filename } = req.file;
  const role = "client";
  console.log(req.body);
  try {
    const user = new userModel({
      name,
      age,
      email,
      password,
      role,
      image_user: filename,
    });
    const AddedUser = await user.save();

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
