const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const dbName = "school";
const collectionName = "class";
const accountsCollection = client.db(dbName).collection(collectionName);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log(`You're connected to your database ${dbName}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const pipeline = [
    // Stage 1: match the accounts with a balance greater than $1,000
    {
        $match: {
            balance: {
                $lt: 1000,
            },
        },
    },
    // Stage 2: calculate average balance and total balance
    {
        $group: {
            _id: "$account_type",
            total_balance: {
                $sum: "$balance",
            },
            avg_balance: {
                $avg: "$balance",
            },
        },
    },
];

const run = async () => {
    try {
        await connectToDb().catch(console.dir);
        let result = await accountsCollection.aggregate(pipeline);
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
