//express is used for routing
const express = require("express");
//programs for the database
const mongoose = require("mongoose");
//main hub to connect all routes
const mainRouter = require("./routes/router");

const { login, createUser } = require("./controllers/users");

//dont know was following the lesson
// const bodyParser = require("body-parser");

//not sure what this does "allow requests from the client to the server to be processed"
const cors = require("cors");

// const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");

//using express
const app = express();
//choosing default port out of 65,535
const { PORT = 3001 } = process.env;

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

//utilizing authentification

//connecting project to data base
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

//connecting app to main router at rout.js
app.use("/", mainRouter);

//using cors
app.use(cors());

//checking what port is being used
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
