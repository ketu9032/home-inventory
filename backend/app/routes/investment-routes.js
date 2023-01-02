const { Router } = require('express');
const controllers = require('../controllers/investment-controller');

const router = Router();
//albums API

router.get('/', controllers.getInvestment);
router.post('/', controllers.addInvestment);
router.put('/', controllers.updateInvestment);
router.put('/remove', controllers.removeInvestment);

module.exports = router;
