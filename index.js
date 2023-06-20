const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
    "mongodb+srv://admin:adminpassword@testcluster.9hkrkub.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You are now connected");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
