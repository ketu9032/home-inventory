const express = require('express');
const cors = require('cors');
const userRoutes = require('./app/routes/users-routes');
const accountRoutes = require('./app/routes/account-routes');
const expenseRoutes = require('./app/routes/expense-routes');
const transferRoutes = require('./app/routes/transfer-routes');
const incomeRoutes = require('./app/routes/income-routes');
const investmentRoutes = require('./app/routes/investment-routes');
const investmentTypeRoutes = require('./app/routes/investment-type-routes');
const expenseTypeRoutes = require('./app/routes/expense-type-routes');
const incomeTypeRoutes = require('./app/routes/income-type-routes');
const dashboardRoutes = require('./app/routes/dashboard-routes');
const borrowRoutes = require('./app/routes/borrow-routes');
const borrowNameRoutes = require('./app/routes/borrow-name-routes');
const app = express();
const port = 4000;
app.use(express.json());
const bodyParser = require('body-parser');
app.use(
  cors({
    origin: '*'
  })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/expenseType', expenseTypeRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/incomeType', incomeTypeRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/investmentType', investmentTypeRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/borrowName', borrowNameRoutes);
app.listen(port, () => console.log(`app listening on port ${port}`));
