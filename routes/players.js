const express = require("express");
const router = express.Router();
const Player = require("../models/player");

router.get("/", async(req, res) => {

    try {
        const players = await Player.find();
        res.json(players);
    } catch(err) {
        res.send("Error: "+err);
    }
    
})

router.get("/:id", async(req, res) => {

    try {
        const player = await Player.findById(req.params.id);
        res.json(player);
    } catch(err) {
        res.send("Error: "+err);
    }
    
})

router.post("/", async(req, res) => {

    const newPlayer = new Player({
        name: req.body.name,
        age: req.body.age,
        role: req.body.role,
        inTeam: req.body.inTeam
    });

    try {
        const createdPlayer = await newPlayer.save();
        res.json(createdPlayer);
    } catch(err) {
        res.send("Error: "+err);
    }
    
})

router.patch("/:id", async(req, res) => {

    try {
        const player = await Player.findById(req.params.id);
        player.name = req.body.name;
        player.age = req.body.age;
        player.role = req.body.role;
        player.inTeam = req.body.inTeam;
        const editedPlayer = await player.save();
        res.json(editedPlayer);
    } catch(err) {
        res.send("Error: "+err);
    }
    
})

router.delete("/:id", async(req, res) => {

    try {
        const player = await Player.findById(req.params.id);
        const result = await Player.remove(player);
        // player.name = req.body.name;
        // player.age = req.body.age;
        // player.role = req.body.role;
        // player.inTeam = req.body.inTeam;
        // const editedPlayer = await player.save();
        res.json(result);
    } catch(err) {
        res.send("Error: "+err);
    }
    
})

module.exports = router;