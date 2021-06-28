const { MongoClient } = require('mongodb');
const config = {push:"push", pull:"pull"}

if(process.env.NODE_ENV!=='production'){
    require('dotenv').config({path:'../../.env'})
}

async function conect(dbpath, operation, data) {
    const uri = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@cluster0.rfmlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        //databasesList = await client.db().admin().listDatabases();

        if (operation === config.pull) {
            db.users.find()
        } else if (operation === config.push) {
            //db.users.insertOne(data);
            await client.db(dbpath.database).collection(dbpath.collection).insertOne(data);
        } else {
            console.log('ERROR(database/app): unregistered operation')
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = conect;

