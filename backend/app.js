const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "imp/imp.env" });
}

//using midleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// importing routes
const post = require("./routes/post");
const user = require("./routes/user");

//using routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
