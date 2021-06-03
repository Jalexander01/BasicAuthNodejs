//Headers
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());//?
app.use(bodyParser.urlencoded({ extended: true }));//use body-parser to grab the data from the html file we want
app.set('view engine', 'ejs');//to use ejs with express
app.use(express.static("public"));//use static files like style.css and js


//get function will send information to the brower at loading
app.get("/", function (req, res) {
    // console.log(req);
    // res.sendFile();
    // res.sendFile(__dirname + "/index.html");
    // res.send(__dirname);

    //ejs
    res.render('index');
})

//post function will receive information from the browser to the server
app.post("/", function (req, res) {
    res.send("The results of ");
    res.redirect("/");//redirects to app.get function or another function
})
//process.env.PORT || heroku code
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
});
