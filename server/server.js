const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const UserRouter = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
