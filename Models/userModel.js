const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const { stringify } = require("jade/lib/utils");

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: { type: String, unique: true },
    password: String,
    phoneNumber: Number,
    role: {
      type: String,
      enum: ["admin", "Passenger", "Driver"],
    },
    image_user: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const passengerSchema = new mongoose.Schema({
  notePassager: { type: Number, default: null },
  //historiqueReservation,
});

const driverSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  noteConduite: { type: Number, default: null },
  //historiqueConduite,
});

userSchema.post("save", async function (req, next) {
  console.log("New user created & saved");
  next();
});
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    (User.CreatedAt = new Date()), (User.UpdatedAt = new Date()), next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      //   if(user.etat === true){
      return user;
      // }
      // throw new Error ("");
    }
    throw new Error("incorrect password");
  }
  throw new Error("incorrect email");
};

const options = { discriminatorKey: "role" };

const User = mongoose.model("user", userSchema);
const Passenger = User.discriminator("passenger", passengerSchema, options);
const Driver = User.discriminator("driver", driverSchema, options);

module.exports = { User, Passenger, Driver };
