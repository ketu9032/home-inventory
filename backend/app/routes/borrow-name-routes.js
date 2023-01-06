const { Router } = require('express');
const controllers = require('../controllers/borrow-name-controller');

const router = Router();
//albums API

router.get('/', controllers.getBorrowName);
router.post('/', controllers.addBorrowName);
router.put('/', controllers.updateBorrowName);
router.put('/remove', controllers.removeBorrowName);
router.get('/borrowNameDropDown',controllers.getBorrowNameDropDown);


module.exports = router;
