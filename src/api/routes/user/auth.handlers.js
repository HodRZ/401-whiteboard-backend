'use strict'

const { AC_TOKEN } = require("../../../config");
const { omit, jwt } = require("../../../config/Utils")
const { User } = require("../../../models");
const { addRefreshToken } = require("../../middlewares/auth");

async function signIn(req, res) {
    try {
        const user = req.body
        const token = jwt.sign({
            username: user.username,
            userId: user.id,
            userEmail: user.email
        }, AC_TOKEN, { expiresIn: "1H" })
        user.token = token
        return res.status(200)
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
        }, AC_TOKEN, { expiresIn: '10m' })
        const refresh_token = addRefreshToken({
            userId: addedUser.id,
            userEmail: addedUser.email
        })

        addedUser.token = token
        await createdUser.update({ refresh_token })
        return res.status(201)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                maxAge: 3 * 60 * 60 * 1000
            })
            .json(addedUser);

    } catch (e) {
        next(e)
    }
}

module.exports = {
    signIn,
    signUp
}