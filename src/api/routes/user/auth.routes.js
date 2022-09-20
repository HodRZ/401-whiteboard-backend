'use strict'

const { express } = require("../../../config")
const { isEmailUnique } = require("../../middlewares/auth/check-existing-email")
const { validateUser } = require("../../middlewares/auth/validate-user")
const { signIn, signUp } = require("./auth.handlers")
const router = express.Router()

router.post('/signin', validateUser, signIn)
router.post('/signup', isEmailUnique, signUp)

module.exports = router