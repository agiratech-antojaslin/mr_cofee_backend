const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const Player = require("../models/player");

// router.get("/users", async(req, res) => {

//     try {
//         const players = await Player.find();
//         res.json(players);
//     } catch(err) {
//         res.send("Error: "+err);
//     }
    
// })

router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json({
            user: user,
            token: token
        });
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

// router.get("/:id", async(req, res) => {

//     try {
//         const player = await Player.findById(req.params.id);
//         res.json(player);
//     } catch(err) {
//         res.send("Error: "+err);
//     }
    
// })

// router.post("/", async(req, res) => {

//     const newPlayer = new Player({
//         name: req.body.name,
//         email: req.body.username,
//         password: req.body.role,
//     });

//     try {
//         const createdPlayer = await newPlayer.save();
//         res.json(createdPlayer);
//     } catch(err) {
//         res.send("Error: "+err);
//     }
    
// })

// router.patch("/:id", async(req, res) => {

//     try {
//         const player = await Player.findById(req.params.id);
//         player.name = req.body.name;
//         player.age = req.body.age;
//         player.role = req.body.role;
//         player.inTeam = req.body.inTeam;
//         const editedPlayer = await player.save();
//         res.json(editedPlayer);
//     } catch(err) {
//         res.send("Error: "+err);
//     }
    
// })

// router.delete("/:id", async(req, res) => {

//     try {
//         const player = await Player.findById(req.params.id);
//         const result = await Player.remove(player);
//         // player.name = req.body.name;
//         // player.age = req.body.age;
//         // player.role = req.body.role;
//         // player.inTeam = req.body.inTeam;
//         // const editedPlayer = await player.save();
//         res.json(result);
//     } catch(err) {
//         res.send("Error: "+err);
//     }
    
// })

module.exports = router;