// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

//using cors
const cors = require("cors");
app.use(cors());

//using body parser to access sent JSON data
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//object to be endpoint for routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

//get function to use as a callBack function inside get route

const getAll = (req, res) => {
  res.status(200).send(projectData);
};
//get route
app.get("/all", getAll);

//post function to use as a callBack function inside post route
const postData = (req, res) => {
  projectData = req.body;
  res.status(200).send(projectData);
};

//post route
app.post("/add", postData);

// Setup Server
const port = 4000;
const hostname = "127.0.0.1";

// testing server
const listenFunction = () => {
  console.log(`server runs at http://${hostname}:${port}/`);
};

app.listen(port, listenFunction);
