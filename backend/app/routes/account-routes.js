const { Router } = require('express');
const controllers = require('../controllers/account-controller');

const router = Router();
//albums API

router.get('/', controllers.getAccount);
router.post('/', controllers.addAccount);
router.put('/', controllers.updateAccount);
router.put('/remove', controllers.removeAccount);
router.get('/getAccountUserId', controllers.getAccountDropDownByUserId);

module.exports = router;
