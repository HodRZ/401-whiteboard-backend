'use strict'

const { validateNewUser } = require("./validate-new-user")
const { validateToken } = require("./validate-token")
const { isEmailUnique } = require('./check-existing-email')


module.exports = {
    isEmailUnique,
    validateNewUser,
    validateToken
}