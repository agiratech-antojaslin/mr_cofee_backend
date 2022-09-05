const express = require('express');
const Product = require('../models/product-modal');
const middleware = require("../middleware/auth");

const router = express.Router()

//Post Method
router.post('/create', middleware, (req, res) => {
    const newProduct = new Product({
        product: req.body.product,
        description: req.body.description,
        category_id: req.body.category_id,
        price: req.body.price,
        status: req.body.status
    })

    try {
        const productToSave = newProduct.save();
        res.status(200).json({
            code: 200, 
            message: "Product created successfully!",
            //product: productToSave 
        })
    }
    catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
})

//Get all Method
router.get('/getAll', middleware, (req, res) => {
    let products = Product.find({}, function(err, products){
        if(err){
            console.log(err);
            res.status(400).json({message: error.message})
        }
        else {
            res.json(products);
        }
    });
})

//Get by ID Method
router.get('/getOne/:id', middleware, (req, res) => {
    Product.findOne({ _id: req.params.id }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Update by ID Method
router.patch('/update/:id', middleware, (req, res) => {
    // var updateUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    Product.updateOne({_id: req.params.id}, { $set: {
        product: req.body.product,
        description: req.body.description,
        category_id: req.body.category_id,
        price: req.body.price,
        status: req.body.status
        }
    }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Delete by ID Method
router.delete('/delete/:id', middleware, (req, res) => {
    Product.deleteOne({ _id: req.params.id }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;