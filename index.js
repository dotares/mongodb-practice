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

const sampleStationary = [
    {
        item: "pencil",
        qty: 10,
        tags: ["red", "black", "thin"],
        dim_cm: [2, 6],
    },
    {
        item: "pen",
        qty: 50,
        tags: ["green", "white", "fountain"],
        dim_cm: [5, 10],
    },
];

const documentToUpdate = { _id: ObjectId("648eab169708be45ab7fc8e3") };
const update = { qty: { $inc: -20 } };

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
        let result = await accountsCollection.updateOne(
            documentToUpdate,
            update
        );
        // let docCount = accountsCollection.countDocuments(documentsToFind);
        // console.log(`There's ${await docCount} documents`);
        for await (let doc of result) console.log(doc);
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
};

run();
