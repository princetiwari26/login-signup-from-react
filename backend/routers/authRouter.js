const { signup, login } = require('../controllers/AuthControllers');
const { signUpValidation, loginValidation } = require('../middleware/AuthValidation');

const router = require('express').Router()


router.post('/login', loginValidation, login)
router.post('/signup', signUpValidation, signup)


module.exports = router;