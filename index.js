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

const documentToDelete = {
    qty: { $lte: 25 },
};

const connectToDb = async () => {
    try {
        await client.connect();
        console.log(`You're connected to your database ${dbName}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const run = async () => {
    try {
        await connectToDb().catch(console.dir);
        let result = await accountsCollection.deleteMany(documentToDelete);
        result.deletedCount > 0
            ? console.log(`Deleted ${result.deletedCount} documents`)
            : console.log(`No documents deleted`);
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
};

run();
