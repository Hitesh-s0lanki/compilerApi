const fs = require('fs')
const path = require('path')

const dirCodes = path.join(__dirname, "codes")

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive: true})
}

const generateFile = async (File,format, code) =>{

    const filename = `${File}.${format}`
    const filepath = path.join(dirCodes,filename)
    await fs.writeFileSync(filepath,code)

    return filepath
}

module.exports = {generateFile}