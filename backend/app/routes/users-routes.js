const {Router} = require('express');
const controllers = require('../controllers/users-controller');

const router = Router();
//albums API

router.get('/',controllers.getAlbums);
router.post('/',controllers.addAlbums);
router.put('/',controllers.updateAlbums);
router.put('/remove',controllers.removeAlbums);


module.exports = router;
