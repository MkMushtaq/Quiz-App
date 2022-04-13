const express = require("express");
const dotenv = require("dotenv").config();
const port = 5001;
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use("/api/choices", require("./routes/getRoutes"));
