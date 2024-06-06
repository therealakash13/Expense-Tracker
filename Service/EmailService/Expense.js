const dotenv = require("dotenv");
const sendEmail = require("../helpers/sendMail");
const Expense = require("../models/Expense");

dotenv.config();

const sendExpenseAlertEmail = async () => {
  try {
    const expenses = await Expense.find();
    const totalExpense = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    if (totalExpense > 5000) {
      const messageOption = {
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "Expense Alert",
        text: `You have exceeded your expense limit. Your current total expense is ${totalExpense}. Please review your expenses.`,
      };
      await sendEmail(messageOption);
      console.log("Expense alert email sent.");
    }
  } catch (error) {
    console.error("Error sending expense alert email:", error);
  }
};

module.exports = sendExpenseAlertEmail;
