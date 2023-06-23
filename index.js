const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

const dbName = "world_population";
const collectionName = "population";
const databaseCollection = client.db(dbName).collection(collectionName);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log(`You're connected to your database ${dbName}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const pipeline = [];

const run = async () => {
    try {
        await connectToDb().catch(console.dir);
        let result = await databaseCollection.aggregate(pipeline);
        for await (const doc of result) {
            console.log(doc);
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
};

run();
