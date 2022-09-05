// const express = require("express");
// const app = express();
// const mysql = require("mysql");
// const dbConfig = require("./config");
// require('dotenv').config();

// var con = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });
  
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// // app.set("view engine", "ejs");

// // app.get("/", (req, res) => {
// //     res.render("index");
// // });

// // const usersRouter = require("./routes/users");
// // //const playersRouter = require("./routes/players");

// // app.use(express.json());

// // app.use("/users", usersRouter);
// // // app.use("/players", playersRouter);
// // // app.use("/auth", authRouter);

// // var con = mysql.createConnection({
// //   host: "localhost",
// //   user: "admin",
// //   password: "@!#254tecmint",
// //   database: "cafe_management"
// // });
  
// // con.connect(function(err) {
// //   if (err) throw err;
// //   console.log("Connected!");
// // });

// app.listen(3000, () => {
//     console.log("Server is listening port 3000")
// });


// const express = require("express");
// const mongoose = require("mongoose");
// //const Router = require("./routes")

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("cafe_management");
//   dbo.collection("users").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = "mongodb://localhost:27017/cafe_management";
const bodyParser = require('body-parser');
var cors = require('cors');
const routes = require('./routes/routes');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})