const { Router } = require('express');
const controllers = require('../controllers/investment-type-controller');

const router = Router();
//albums API

router.get('/', controllers.getInvestmentType);
router.post('/', controllers.addInvestmentType);
router.put('/', controllers.updateInvestmentType);
router.put('/remove', controllers.removeInvestmentType);
router.get('/investmentTypeDropDown',controllers.getInvestmentTypeDropDown);


module.exports = router;
