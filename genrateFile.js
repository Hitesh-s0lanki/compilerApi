const fs = require('fs')
const path = require('path')
const {v4 : uuid } = require('uuid')
const { executeCpp, executePy } = require('./execute')

const dirCodes = path.join(__dirname, "codes")

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive: true})
}

const generateFile = async (format, code) =>{

    const jobId = uuid();
    const filename = `${jobId}.${format}`
    const filepath = path.join(dirCodes,filename)
    await fs.writeFileSync(filepath,code)

    return filepath
}
const func = async()=>{
    try{
        // const file = await generateFile("cpp","#include<iostream>\nusing namespace std;\nint main(){\ncout<<\"hello world\";\nreturn 0;\n}\n")
        const file = await generateFile("py","print('hello')")
        
        // const output = await executeCpp(file)
        const output = await executePy(file)
    
        console.log(output)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {generateFile,func}