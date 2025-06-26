const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/router");
const bodyParser = require("body-parser");
const cors = require("cors");

// const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

// app.post("/signin", login);
// app.post("/signup", createUser);

app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: "683c5426396f7ba2205b3b6f", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use("/", auth, mainRouter);

app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
