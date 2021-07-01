const database = require('../app'),
    fs = require('fs'),
    FILENAME = './fileSystem/obgsfall.json',
    PULLCOMMAND = 'pull';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../../../.env' })
}

database(
    {
        database: process.env.SILENTFILMS_DATABASE,
        collection: process.env.SILENTFILMS_COLLECTION
    },
    PULLCOMMAND
    ).then(e=>{
        fs.writeFileSync(FILENAME, JSON.stringify(e));
        console.log('Created : '+FILENAME);
})


// build json file in fileSystem used in data folder operations





