const jwt = require("jsonwebtoken");
const { User } = require("../Models/userModel");

module.exports.requireAuthUser = async (req, res, next) => {
  const token = req.cookies.this_is_jstoken;
  // console.log("jwt", token);

  if (token) {
    jwt.verify(token, process.env.Net_Secret, async (err, decodedToken) => {
      if (err) {
        res.status(401).json("/problem decoding token");
      } else {
        // console.log("decodedToken", decodedToken);
        // console.log("decodedToken id", decodedToken.id);
        const user = await User.findById(decodedToken.id);
        //console.log("user", user)
        req.session.user = user;
        //console.log(req)
        next();
      }
    });
  } else {
    res.status(401).json("/pas de token");
  }
};
