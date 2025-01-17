const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const UserRouter = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");

connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // specify the allowed origin
  credentials: true, // allow credentials
};

app.use(cors(corsOptions));
app.use(cookieParser()); // Ensure cookie-parser is used here
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", UserRouter);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
