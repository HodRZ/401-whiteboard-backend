'use strict'

const { validateUserCred } = require("./validate-new-user")
const { validateToken } = require("./validate-token")
const { isEmailUnique } = require('./check-existing-email')


module.exports = {
    isEmailUnique,
    validateUserCred,
    validateToken
}