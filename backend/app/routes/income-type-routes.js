const { Router } = require('express');
const controllers = require('../controllers/income-type-controller');

const router = Router();
//albums API

router.get('/', controllers.getIncomeType);
router.post('/', controllers.addIncomeType);
router.put('/', controllers.updateIncomeType);
router.put('/remove', controllers.removeIncomeType);
router.get('/incomeTypeDropDown',controllers.getIncomeTypeDropDown);


module.exports = router;
