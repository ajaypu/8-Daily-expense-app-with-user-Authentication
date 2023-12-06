const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const errController = require("./controllers/error");
const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");

app.use(cors());

//Databse
const sequelize = require("./util/database");
const Expense = require("./models/expense");
const User = require("./models/user");

const userAuth = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
// app.use(userAuth.authenticate);
app.use("/expense", userAuth.authenticate, expenseRouter);
app.use(errController.error404);

// // Associations
User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    console.log("Database Connected Succesfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
