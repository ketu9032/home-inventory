const { Router } = require('express');
const controllers = require('../controllers/expense-controller');

const router = Router();
//albums API

router.get('/', controllers.getExpense);
router.post('/', controllers.addExpense);
router.put('/', controllers.updateExpense);
router.put('/remove', controllers.removeExpense);

module.exports = router;
