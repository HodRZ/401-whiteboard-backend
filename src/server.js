'use strict'

const cors = require('cors')
const morgan = require('morgan')
const { postRoute, commentRoute, userRoutes, signinRoute } = require('./api/routes')
const { express } = require('./config')
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(postRoute)
app.use(commentRoute)
app.use(userRoutes)
app.use(signinRoute)

function radio(port) {
    app.listen(port, (req, res) => {
        console.log(`Diamond City Radio at ${port}`)
    })
}

app.get('/', (req, res) => {
    res.status(200).send('Hey Mom!')
})



module.exports = { radio, app }