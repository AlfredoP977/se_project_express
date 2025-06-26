//express is used for routing
const express = require("express");
//programs for the database
const mongoose = require("mongoose");
//main hub to connect all routes
const mainRouter = require("./routes/router");

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

// app.post("/signin", login);
// app.post("/signup", createUser);

//utilizing authentification
app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: "683c5426396f7ba2205b3b6f", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

//connecting project to data base
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

app.use(express.json());

//connecting app to main router at rout.js
app.use("/", auth, mainRouter);

//using cors
app.use(cors());

//checking what port is being used
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
