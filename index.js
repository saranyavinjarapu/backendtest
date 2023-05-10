require("dotenv").config();
const userProfileActions = require("./UserProfileActions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (request, response) => {
  response.json({
    message: "User Profile Details Microservice using NodeJS and Express ",
  });
});

app.post("/userProfile", userProfileActions.saveUserProfile);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
