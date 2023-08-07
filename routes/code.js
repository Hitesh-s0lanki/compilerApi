const express = require('express')

const route = express.Router()

const {generateFile} = require('../genrateFile')
const { executeCpp, executePy } = require('../execute')

route.post('/run',async(req,res)=>{
    const {language = "cpp",code} = req.body

    if(code === ""){
        res.send("Error file can't be empty")
    }

    const filename = await generateFile(language,code)

    let output;
    if(language === "cpp"){
        output = await executeCpp(filename)
    }else if(language === "py"){
        output = await executePy(filename)
    }

    res.send({filename,output})
})



module.exports = route