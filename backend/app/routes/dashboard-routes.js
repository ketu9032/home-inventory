const { Router } = require('express');
const controllers = require('../controllers/dashboard-controller');

const router = Router();
//albums API

router.get('/details', controllers.getDashboardDetails);
router.get('/detailsChart', controllers.getDashboardDetailsChart);
router.get('/investmentChart', controllers.getInvestmentChart);
router.get('/incomeChart', controllers.getIncomeChart);
router.get('/expenseChart', controllers.getExpenseChart);


module.exports = router;
