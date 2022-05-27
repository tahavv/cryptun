const express = require('express')
const cors = require('cors')
const { route } = require('./routes/auth')
const app = express()


app.use(express.json())
app.use(cors())

//login and register
app.use('/', require('./routes/auth'))
app.use('/verify', require('./routes/auth'))
    //home
app.use('/home', require('./routes/home'))

app.listen(5000, () => console.log('server running on port http://localhost:5000'))