const { Router } = require('express');
const controllers = require('../controllers/income-controller');

const router = Router();
//albums API

router.get('/', controllers.getIncome);
router.post('/', controllers.addIncome);
router.put('/', controllers.updateIncome);
router.put('/remove', controllers.removeIncome);

module.exports = router;
