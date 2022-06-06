const { MongoClient } = require('mongodb');
const { mongo } = require('../settings.json');

function getMongoClient() {
    const host = mongo.host;
    const port = mongo.port;
    const db = mongo.db;

    return new MongoClient(`mongodb://${host}:${port}/${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

let mongoClient = getMongoClient();
let connected = false;

process.once('exit', async () => {
    if (connected) 
        await mongoClient.close();
});


async function getChat() {
    if (!connected)
        throw new Error(`[MongoDb] Something went wrong: Connection is not initialized!`);

    return await mongoClient.db(mongo.db || 'test').collection('chat').find().toArray();
}

async function writeMessage(message) {
    if (!connected)
        throw new Error(`[MongoDb] Something went wrong: Connection is not initialized!`);

    await mongoClient.db(mongo.db || 'test').collection('chat').insert(message);
}

async function init() {
    if (!connected)
        await mongoClient.connect();

    connected = true;
}

module.exports = {
    getChat,
    writeMessage,
    init
};