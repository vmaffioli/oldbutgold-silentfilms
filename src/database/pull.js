const { MongoClient } = require('mongodb');
let report = {
    msg: 'nothing happened',
    data: []
};

if(process.env.NODE_ENV!=='production'){
    require('dotenv').config({path:'../../../.env'})
}

async function pull(dbpath) {
    const url = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@cluster0.rfmlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        const cursor = await client.db(dbpath.database).collection(dbpath.collection).find({});
        report.data = await cursor.toArray();
        report.msg = ' - pull successful!'
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return report;
}

module.exports = pull;

/*
(async () => {
    console.log(
        await pull({
            database:process.env.SILENTFILMS_DATABASE,
            collection:process.env.SILENTFILMS_COLLECTION
        })
    )
})()
// */


