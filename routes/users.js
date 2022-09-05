const express = require('express');
const User = require('../models/user');

const router = express.Router()

//Post Method
router.post('/createUser', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const userToSave = newUser.save();
        res.status(200).json(userToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
    let users = User.find({}, function(err, posts){
        if(err){
            console.log(err);
            res.status(400).json({message: error.message})
        }
        else {
            res.json(posts);
        }
    });
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    var updateUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    User.updateOne({_id: req.params.id}, { $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password }
    }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/deleteUser/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;