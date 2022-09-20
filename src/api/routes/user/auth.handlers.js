'use strict'

const { AC_TOKEN } = require("../../../config");
const { omit, jwt } = require("../../../config/Utils")
const { User } = require("../../../models")

async function signIn(req, res) {
    try {
        const user = req.body
        const token = jwt.sign({
            username: user.username,
            userId: user.id,
            userEmail: user.email
        }, AC_TOKEN, { expiresIn: 900000 })
        return res.status(200)
            .cookie('access-token', token)
            .json(user)
    } catch (e) {
        return res.status(401).json('Username or Password are incorrect');
    }
}

async function signUp(req, res, next) {
    try {
        const newUser = req.body;
        const createdUser = await User.create(newUser, next);
        const addedUser = omit(createdUser.dataValues, ['password'])
        const token = jwt.sign({
            username: addedUser.username,
            userId: addedUser.id,
            userEmail: addedUser.email
        }, AC_TOKEN, { expiresIn: 900000 })
        return res.status(201)
            .cookie('access-token', token)
            .json(addedUser);

    } catch (e) {
        next(e)
    }
}

module.exports = {
    signIn,
    signUp
}