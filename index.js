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

const sampleDocument = {
    item: "pencil",
    qty: 10,
    tags: ["red", "black", "thin"],
    dim_cm: [2, 6],
};

async function run() {
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

run().catch(console.dir);
