'use strict'

const { express } = require("../../../config")
const { signIn } = require("./auth.handlers")
const router = express.Router()

router.post('/signin', signIn)

module.exports = router