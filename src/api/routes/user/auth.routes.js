'use strict'

const { express } = require("../../../config")
const { isEmailUnique, validateUserCred } = require("../../middlewares/auth")
const { signIn, signUp } = require("./auth.handlers")
const router = express.Router()

router.post('/signin', validateUserCred, signIn)
router.post('/signup', isEmailUnique, signUp)

module.exports = router