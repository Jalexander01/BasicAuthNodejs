//Headers
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());//?
app.use(bodyParser.urlencoded({ extended: true }));//use body-parser to grab the data from the html file we want
app.set('view engine', 'ejs');//to use ejs with express
app.use(express.static("public"));//use static files like style.css and js

const mongoose = require("mongoose");

const encrypt = require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


// const SOME_LONG_UNGUESSABLE_STRING = "This is me right now";

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const User = mongoose.model("User", userSchema);




//get function will send information to the brower at loading
app.get("/", function (req, res) {
    res.render('home');
});

//post function will receive information from the browser to the server


app.get("/login", function (req, res) {
    res.render('login');
});
app.get("/register", function (req, res) {
    res.render('register');
});

app.get("/submit", function (req, res) {
    res.render('submit');
});



app.post("/", function (req, res) {
    res.send("The results of ");
    res.redirect("/");//redirects to app.get function or another function
});

app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        }

    });
});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");

                }
            }
        }
    });

});

//process.env.PORT || heroku code
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
});
