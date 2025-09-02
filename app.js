//  express is used for routing
const express = require("express");
//  programs for the database
const mongoose = require("mongoose");
//  not sure what this does "allow requests from the client to the server to be processed"
const cors = require("cors");
//  main hub to connect all routes
const mainRouter = require("./routes");

const { login, createUser } = require("./controllers/users");
//errorHandler
const { errorHandler } = require("./middlewares/error-handler.js");

const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");

//  using express
const app = express();

// Enable cross-origin resource sharing for client-server communication
app.use(cors());
//environmental variables
require("dotenv").config();

//  choosing default port out of 65,535
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

//  utilizing authentification

//  connecting project to data base
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);
//  connecting app to main router at rout.js
app.use("/", mainRouter);

app.use(errorLogger); // enabling the error logger

app.use(errors());

app.use(errorHandler);

//  checking what port is being used
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
