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

async function connectToDb() {
    try {
        await client.connect();
        await client.db(dbName).command({ ping: 1 });
        console.log(
            `Pinged your deployment (${dbName}). You are now connected`
        );
    } finally {
        await client.close();
    }
}

const main = async () => {
    try {
        await connectToDb().catch(console.dir);
        result = await accountsCollection.insertOne(sampleStationary);
        console.log(result.insertedId);
    } finally {
        await client.close();
    }
};

main();
