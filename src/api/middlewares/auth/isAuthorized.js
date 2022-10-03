'use strict'

const { Post } = require("../../../models")


async function isAuthorized(req, res, next) {
    const { userId, userRoles } = req.user
    const id = req.params.id
    const post = await Post.getPopulated(id, next)
    if (post.dataValues.UserId === userId || userRoles == 'admin') {
        next()
    } else {
        res.status(403).json('unauthorized')
    }


}

module.exports = { isAuthorized }