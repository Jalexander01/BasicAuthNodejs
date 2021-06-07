//Headers

const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());//?
app.use(bodyParser.urlencoded({ extended: true }));//use body-parser to grab the data from the html file we want
app.set('view engine', 'ejs');//to use ejs with express
app.use(express.static("public"));//use static files like style.css and js
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalmongoose = require("passport-local-mongoose");


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);


// const SOME_LONG_UNGUESSABLE_STRING = "This is me right now";


const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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

});

app.post("/login", function (req, res) {


});

//process.env.PORT || heroku code
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
});
