const { Router } = require('express');
const controllers = require('../controllers/borrow-controller');
const router = Router();
//albums API
router.get('/', controllers.getBorrow);
router.post('/', controllers.addBorrow);
router.put('/', controllers.updateBorrow);
router.put('/remove', controllers.removeBorrow);
module.exports = router;
