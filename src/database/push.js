const { MongoClient } = require('mongodb');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../../.env' })
}

async function push(dbpath, data) {
    const uri = "mongodb+srv://admin:"
        + process.env.DB_PASSWORD +
        "@cluster0.rfmlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        client = new MongoClient(uri);
    let report = {
        msg: ' - nothing happened'
    };
    try {
        await client.connect();
        await client.db(dbpath.database)
            .collection(dbpath.collection)
            .insertOne(data);
        report.msg = ' - push successful!';
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return report
}

module.exports = push;

