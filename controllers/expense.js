const Expense = require("../models/expense");

exports.addExpense = (req, res, next) => {
  const { amount, description, category } = req.body;

  if (
    amount === undefined ||
    description === undefined ||
    category === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Parameters missing" });
  }

  Expense.create({ amount, description, category })
    .then((expense) => {
      return res.status(201).json({ expense, success: true });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      return res.status(200).json({ expenses, success: true });
    })
    .catch((err) => {
      return res.status(500).json({ error: err, success: false });
    });
};

exports.deleteExpense = (req, res, next) => {
  const expId = req.params.id;

  Expense.destroy({ where: { id: expId } })
    .then((response) => {
      res.status(203).json({ success: true, message: "Deleted Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
