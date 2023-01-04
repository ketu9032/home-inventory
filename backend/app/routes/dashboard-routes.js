const { Router } = require('express');
const controllers = require('../controllers/dashboard-controller');

const router = Router();
//albums API

router.get('/details', controllers.getDashboardDetails);
router.post('/', controllers.addAccount);
router.put('/', controllers.updateAccount);
router.put('/remove', controllers.removeAccount);
router.get('/getAccountUserId', controllers.getAccountDropDownByUserId);

module.exports = router;
