const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fetchuser = require ("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "iamwhatiam9";

// ROUTE 1 : Create a user using : POST "/api/auth/createuser". Login not required

router.post(
  "/createuser",
  [
    body("name", "Length of the name must be atleast of 3 characters").isLength(
      { min: 3 }
    ),
    body("email", "Entered email must be a valid email").isEmail(),
    body("password", "The  passwors must be altaest of 5 charaters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
     let success = false;
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check weather the user with this email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: " Sorry the user with this email already exists " });
      }
      // Generating the hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data ={
        user:{
           id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET )
      success = true;
      res.json({success, authToken});
    } catch (error) {
      console.log({ error: error.message });
      res.status(400).send("Internal server error");
    }
  }
);
// ROUTE 2 : Authenticate a user using : POST "/api/auth/login". Login not required

router.post("/login",
  [
    body("email", "Entered email must be a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],async (req, res) => {
    let success = false;
    // If there are errors, return bad request and errors
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email, password} = req.body;
    try {
      const user =  await User.findOne({email});
      if(!user){
        success = false;
        return res.status(400).json({success, error:"Please try to login with correct credentials"})
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if(!comparePassword){
         success = false;
        return res.status(400).json({success,error:"Incorrect password"})
      }
      const data ={
        user:{
          id :user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET )
       success = true;
      res.json({success, authToken});
    } catch (error) {
      console.log({ error: error.message });
      res.status(400).send("Internal server error");
    }
  }
);

// ROUTE 3 : Get loggedin user details using : POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user =  await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).send("Internal server error");
  }
});
module.exports = router;
