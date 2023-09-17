const { exec } = require('child_process')
const fs = require("fs")
const path = require('path')

const outputPath = path.join(__dirname,"outputs")

if( !fs.existsSync(outputPath)) {
     fs.mkdirSync(outputPath,{recursive: true})
}


const executeCpp = ( filepath ) =>{
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath,`${jobId}.out`)
    return new Promise((resolve,reject)=>{
        exec(`g++ ${filepath} -o ${outPath} && ${outPath}`,
        (error, stdout , stderr )=>{
            error && reject({error,stderr})
            stderr && reject(stderr)
            resolve(stdout)
        })
    })
}

const executePy = ( filepath ) =>{
    return new Promise((resolve,reject)=>{
        exec(`python ${filepath}`,
        (error, stdout , stderr )=>{
            error && reject({error,stderr})
            stderr && reject(stderr)
            resolve(stdout)
        })
    })
}


const executeC = (filepath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(`gcc ${filepath} -o ${outPath} && ${outPath}`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
    });
};

const executeJavascript = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`node ${filepath}`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
    });
};

const executeJava = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outpath = filepath.split(jobId)[0]

    return new Promise((resolve, reject) => {
        exec(`javac ${filepath} && java -cp ${outpath} ${jobId}`, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = { executeCpp ,executePy,executeC,executeJavascript, executeJava}

