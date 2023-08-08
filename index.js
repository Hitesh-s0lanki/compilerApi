const express = require('express')

const app = express()

const cors = require('cors')

const PORT = 5000

app.use(cors())

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/api',require('./routes/code'))

app.listen(PORT,()=>{
    console.log("connected to the port")
})