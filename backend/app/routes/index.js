const express = require('express');
const router = new express.Router();
const users = require('./../controllers/user.controller');
const transfers = require('./../controllers/transfer.controller');
const expense = require('./../controllers/expense.controller');


const { STATUS_CODE, RESPONSE_STATUS } = require('../constant/response-status');
const { MESSAGES } = require('../constant/messages');
const { verifyToken } = require('../utils/common');

router.get('/', (req, res) => res.send('ok'));
router.post('/api/users/login', users.login);

router.use('/', async (req, res, next) => {
  const token = req.headers.authorization;
  const { status, data } = await verifyToken(token);
  if (status !== RESPONSE_STATUS.SUCCESS) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .send({ message: MESSAGES.AUTH.INVALID_TOKEN });
    return;
  }
  res.locals.tokenData = data;
  return next();
});

router.delete('/api/users', users.delete);
router.get('/api/users', users.findAll);
router.post('/api/users', users.add);
router.put('/api/users', users.update);
router.put('/api/users/changeStatus', users.changeStatus);
router.get('/api/getUserDropDown', users.getUserDropDown);
router.put('/api/users/onCheckUserName', users.onCheckUserName);

router.delete('/api/transfers', transfers.delete);
router.get('/api/transfers', transfers.findAll);
router.post('/api/transfers', transfers.add);
router.put('/api/transfers', transfers.update);
router.put('/api/transfers/changeStatus', transfers.changeStatus);
router.put('/api/transfers/approved', transfers.approved);
router.get('/api/transfers/getReceiveByUserIdInRojMed', transfers.getReceiveByUserIdInRojMed);
router.get('/api/transfers/getTransferByUserIdInRojMed', transfers.getTransferByUserIdInRojMed);

router.delete('/api/expense', expense.delete);
router.get('/api/expense', expense.findAll);
router.post('/api/expense', expense.add);
router.put('/api/expense', expense.update);
router.put('/api/expense/changeStatus', expense.changeStatus);
router.put('/api/expense/approved', expense.approved);
router.get('/api/expense/getSalesByUserIdInRojMed', expense.getExpenseByUserIdInRojMed);


module.exports = router;

