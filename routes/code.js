const express = require('express')

const route = express.Router()

const {generateFile} = require('../genrateFile')
const { executeCpp, executePy, executeC, executeJavascript } = require('../execute')

route.post('/run',async(req,res)=>{
    const {file,language = "cpp",code} = req.body

    if(code === ""){
        res.send("Error file can't be empty")
    }
    try{
        const filename = await generateFile(file,language,code)
    
        let output;
        if(language === "cpp"){
            output = await executeCpp(filename)
        }else if(language === "py"){
            output = await executePy(filename)
        } else if(language === "c"){
            output = await executeC(filename)
        } else if(language === "js"){
            output = await executeJavascript(filename)
        }
        res.json({filename,output})
    }catch(err){
        res.json(err)
    }

})



module.exports = route