const express = require('express');
const cors = require('cors');

const userRoutes = require('./app/routes/users-routes');
const accountRoutes = require('./app/routes/account-routes');
const expenseRoutes = require('./app/routes/expense-routes');
const transferRoutes = require('./app/routes/transfer-routes');
const incomeRoutes = require('./app/routes/income-routes');
const investmentRoutes = require('./app/routes/investment-routes');

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
app.use('/api/account', accountRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/investment', investmentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
