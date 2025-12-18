require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database.config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "API fonctionnelle",
  });
});

app.use('/auth', require('./src/routes/auth.routes'));

const PORT = process.env.API_PORT || 3000

connectDB();

app.listen(PORT, () => {
  console.log(`API démarrée sur : http://localhost:${PORT}`);
});
