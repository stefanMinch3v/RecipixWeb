const path = require('path');
const fs = require('fs');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

let configPath = path.normalize(path.join(__dirname, '/../../sensitiveData.json'));
let parsedData = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

// Environment config
module.exports = {
    development: {
        rootPath: rootPath,
        db: `mongodb://${parsedData.dbUsername}:${parsedData.dbPassword}@ds125422.mlab.com:25422/recipix-db`,
        dbLocal: 'mongodb://localhost:27017/generictemplate',
        port: 1337
    },
    staging: {
    },
    production: {
        port: process.env.PORT,
        rootPath: rootPath,
        db: `mongodb://${parsedData.dbUsername}:${parsedData.dbPassword}@ds125422.mlab.com:25422/recipix-db`
    }
};