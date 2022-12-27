const {Router} = require('express');
const controllers = require('../controllers/users-controller');

const router = Router();
//albums API

router.get('/',controllers.getUser);
router.post('/',controllers.addUser);
router.put('/',controllers.updateUser);
router.put('/remove',controllers.removeUser);
router.get('/getUserDropDown',controllers.getUserDropDown);


module.exports = router;
