const express = require("express");
const app = express();
const logger = require("morgan");
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/public", express.static("public"));

app.get("/", function (req, res) {
  res.send("Welcome back, visitor!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server listening :${PORT}`);
});

module.exports = app;
