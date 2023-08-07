const express = require('express')

const app = express()

const cors = require('cors')

const PORT = 5000

app.use(cors())

app.use(express.json())

app.use('/',(req,res)=>{
    res.send("hello world")
})

app.use('/api',require('./routes/code'))

app.listen(PORT,()=>{
    console.log("connected to the port")
})