const { Router } = require('express');
const controllers = require('../controllers/expense-type-controller');

const router = Router();
//albums API

router.get('/', controllers.getExpenseType);
router.post('/', controllers.addExpenseType);
router.put('/', controllers.updateExpenseType);
router.put('/remove', controllers.removeExpenseType);
router.get('/expenseTypeDropDown',controllers.getExpenseTypeDropDown);


module.exports = router;
