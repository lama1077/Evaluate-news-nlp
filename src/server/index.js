const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

const meaningcloudURL = "https://api.meaningcloud.com/sentiment-2.1?";
console.log(`Your API key is ${process.env.API_KEY}`);
let projectdata = [];

// designates what port the app will listen to for incoming requests
app.listen(8114, function () {
    console.log("Example app listening on port 8114!");
});

app.get("/all", function (req, res) {
    res.send(mockAPIResponse);
});
app.post("/add", async function (req, res) {
    projectdata = req.body.url;
    let api_URL = `${meaningcloudURL}key=${process.env.API_KEY}&url=${projectdata}&lang=en`
    let response = await fetch(api_URL);
    let meaningCData = await response.json();
    console.log(meaningCData);
    res.send(meaningCData);
});
