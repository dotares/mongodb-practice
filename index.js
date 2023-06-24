const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

const dbName = "sample_analytics";
const collectionName = "customers";
const databaseCollection = client.db(dbName).collection(collectionName);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log(`You're connected to your database ${dbName}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

// const pipeline = [
//     {
//         // Match countries with less than a million population
//         $match: {
//             pop2023: { $lt: 1000000 },
//         },
//     },
//     {
//         // Group the documents according to the rank and calculate the values
//         $group: {
//             _id: "$area",
//             averagePopulation: { $avg: { $round: "$pop2023" } },
//         },
//     },
//     {
//         $sort: { _id: 1 },
//     },
// ];

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
