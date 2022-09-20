'use strict'

const { AC_TOKEN } = require("../../../config")
const { jwt } = require("../../../config/Utils")

function validateToken(req, res, next) {
    if (!req.headers.authorization) {
        next('Not Authorized')
    }
    try {
        const token = req.headers.authorization.split(' ').pop()
        const userInfo = jwt.verify(token, AC_TOKEN, (err, info) => {
            (err) ? next(err) : info
        })
        req.user = userInfo
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    validateToken
}