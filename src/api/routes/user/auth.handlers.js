'use strict'

const { bcrypt } = require("../../../config/Utils")
const { userModel } = require("../../../models")

async function signIn(req, res, next) {
    const { email, password } = req.body
    const user = await userModel.findOne({ where: { email } })
    const hashed = user.dataValues.password
    const isPassCorrect = await bcrypt.compare(password, hashed)
    if (isPassCorrect) {
        res.status(200).json(`welcome ${user.dataValues.name}`)
    } else {
        res.status(403).json('انقلع')
    }
}

module.exports = {
    signIn
}