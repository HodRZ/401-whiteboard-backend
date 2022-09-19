'use strict'

const { bcrypt, base64, omit, jwt } = require("../../../config/Utils")
const { userModel, User } = require("../../../models")

async function signIn(req, res) {
    const authHeader = req.headers.authorization.split(' ');
    const encodedValue = authHeader.pop();
    const decodedValue = base64.decode(encodedValue);
    const [email, password] = decodedValue.split(':');
    const user = await userModel.findOne({ where: { email }, raw: true, })
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (isAuthenticated) {
            const authenticated = omit(user, ['password'])
            const token = jwt.sign({
                username: user.username,
                userId: user.id,
                userEmail: user.email
            }, process.env.TOKEN_KEY)
            authenticated.token = token
            return res.status(200).json(authenticated)
        } else {
            return res.status(401).json('Username or Password are incorrect');
        }
    } else {
        return res.status(401).json('Username or Password are incorrect');
    }
}

async function signUp(req, res, next) {
    const newUser = req.body;
    newUser.email = newUser.email.toLowerCase()
    const email = newUser.email
    const user = await userModel.findOne({ where: { email }, raw: true, })
    if (!user) {
        const createdUser = await User.create(newUser, next);
        const addedUser = omit(createdUser.dataValues, ['password'])
        res.status(201).json(addedUser);
    } else {
        return res.status(401).json('Email already exist');
    }
}

module.exports = {
    signIn,
    signUp
}