'use strict'

const { express } = require("../../../config")
const { isEmailUnique, validateNewUser } = require("../../middlewares/auth")
const { signIn, signUp } = require("./auth.handlers")
const router = express.Router()

router.post('/signin', validateNewUser, signIn)
router.post('/signup', isEmailUnique, signUp)

module.exports = router