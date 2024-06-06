const express = require("express");
const cron = require("node-cron");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const expenseEmail = require("./EmailService/Expense");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log("DB Connection Failed. Error: " + err);
  });

const schedule = () => {
  cron.schedule("0 20 * * *", () => {
    expenseEmail();
  });
};

schedule();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
