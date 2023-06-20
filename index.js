const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri =
    "mongodb+srv://admin:adminpassword@testcluster.9hkrkub.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const dbName = "stationary";
const collectionName = "inventory";
const accountsCollection = client.db(dbName).collection(collectionName);

const sampleStationary = {
    item: "pencil",
    qty: 10,
    tags: ["red", "black", "thin"],
    dim_cm: [2, 6],
};

const connectToDb = async () => {
    try {
        await client.connect();
        console.log(`You're connected to your database ${dbName}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

connectToDb().catch(console.dir);

const run = async () => {
    try {
        await connectToDb();
        result = await accountsCollection.insertOne(sampleStationary);
        console.log(result.insertedId);
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
};

run();
