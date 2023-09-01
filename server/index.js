const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

// Load env config file
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser())

app.use(express.json());

app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on http://localhost:${PORT}/`
  );
});