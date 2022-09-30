'use strict'

const { express } = require("../../../config")
const { isEmailUnique, validateUserCred, validateRefreshToken } = require("../../middlewares/auth")
const { signIn, signUp, refreshSignIn, signOut } = require("./auth.handlers")
const router = express.Router()

router.post('/signin', validateUserCred, signIn)
router.post('/signup', isEmailUnique, signUp)
router.post('/silent', validateRefreshToken, refreshSignIn)
router.delete('/silent', signOut)

module.exports = router