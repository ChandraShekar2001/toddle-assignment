const router = require('express').Router();
const {register} = require('../controllers/userController');
const {isAuthenticated} = require('../middleware/auth')

router.route('/register').post(register);
router.route('/auth').get(isAuthenticated);

module.exports = router;