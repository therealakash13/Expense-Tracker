const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenseRoute = require("./routes/expense");

dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

//Routes

app.use("/expenses", expenseRoute);

//DB connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`DB listening on port ${process.env.PORT}`)
);
