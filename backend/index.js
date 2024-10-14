const express = require('express')
const app = express()
require('dotenv').config()

const bodyparser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routers/authRouter.js')

require('./models/db.js')



const PORT = process.env.PORT || 8000

app.use(bodyparser.json())
app.use(cors())
app.use('/auth', authRouter)

app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}`);
})
