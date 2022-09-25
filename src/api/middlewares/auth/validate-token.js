'use strict'

const { AC_TOKEN, REFRESH_TOKEN } = require("../../../config")
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

function validateRefreshToken(req, res, next) {
    const refreshToken = req.headers.cookie.split('=').pop()
    const verified = jwt.verify(refreshToken, REFRESH_TOKEN)
    next()
}

module.exports = {
    validateToken,
    validateRefreshToken
}