const { Router } = require('express');
const controllers = require('../controllers/transfer-controller');

const router = Router();
//albums API

router.get('/', controllers.getTransfer);
router.post('/', controllers.addTransfer);
router.put('/', controllers.updateTransfer);
router.put('/remove', controllers.removeTransfer);


module.exports = router;
