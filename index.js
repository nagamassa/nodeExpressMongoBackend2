import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import studentRoutes from './routes/student.js'

const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors())

const CONNECTION_URL = 'mongodb://localhost:27017/local'
const PORT = process.env.PORT || 6789

// const TOKEN = process.env.TOKEN || 12345
// const auth = (req, res, next) => {
//     if (req.query.token !== TOKEN)
//         return res.status(401).send("Unauthorized")
//     return next()
// }
// app.use(auth)

app.use('/students', studentRoutes)


mongoose.Promise = Promise
mongoose.connect(CONNECTION_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => app.listen(PORT, () =>
    console.log(`Express is running on port ${PORT}`)
)).catch((err) => console.log(err.message))

mongoose.connection.on('connected', () =>
    console.log('[MongoDB] is running on port 27017')
)

mongoose.connection.on('disconnected', () =>
    console.warn('[MongoDB] is not connected')
)
// mongoose.set('useFindAndModify', false)