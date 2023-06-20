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

const documentToUpdate = { item: "pencil" };
const update = { $set: { sharp: true } };

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
        let result = await accountsCollection.updateMany(
            documentToUpdate,
            update
        );
        result.modifiedCount > 0
            ? console.log(`${result.modifiedCount} documents updated`)
            : console.log(`No documents updated`);
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
};

run();
