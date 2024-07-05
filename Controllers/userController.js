const { User, Passenger, Driver } = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "net amal secret", { expiresIn: maxAge });
};

module.exports.addUserP = async (req, res) => {
  const { name, age, email, password, phoneNumber } = req.body;
  const role = "Passenger";
  console.log(req.body);
  try {
    // const user = await userModel.create({
    //   name, age, email, password
    // })
    const passenger = new Passenger({
      name,
      age,
      email,
      password,
      role,
      phoneNumber,
    });
    const AddedUser = await passenger.save();

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.addUserD = async (req, res) => {
  const { name, age, email, password, phoneNumber } = req.body;
  const role = "Driver";
  console.log(req.body);
  try {
    const driver = new Driver({
      name,
      age,
      email,
      password,
      role,
      phoneNumber,
    });
    const AddedUser = await driver.save();

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
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
    const checkIfUserExists = await User.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !");
    }
    await User.findByIdAndDelete(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, phoneNumber } = req.body;
    const role = "Passenger" || "driver";
    const checkIfUserExists = await User.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !");
    }
    updated = await User.findByIdAndUpdate(
      id,
      {
        $set: { name, age, email, phoneNumber },
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
    const role = "Driver" || "Passenger";
    const checkIfUserExists = await User.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !");
    }
    updated = await User.findByIdAndUpdate(
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
    const users = await User.findById(id);
    if (users.length === 0 && !users) {
      throw new Error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.addwithImg = async (req, res) => {
  const { email, password } = req.body;
  const { filename } = req.file;
  const role = "client";
  console.log(req.body);
  try {
    const user = new User({
      email,
      password,
      role,
      image_user: filename,
    });
    const AddedUser = await user.save(); //-------

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    //await User.findByIdAndUpdate({ id: user._id }, { statu: true });
    const token = createToken(user._id);
    console.log(token);

    res.cookie("this_is_jstoken", token, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
