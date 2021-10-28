const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// myuser1
// T4FR7VuEhFPqul47

app.use(cors());
app.use(express.json())// alternative of body parser


const uri = "mongodb+srv://myuser1:T4FR7VuEhFPqul47@cluster0.74aai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const collection = client.db("mongo-crud").collection("users");

//     console.log('database connected');
//     const user = {
//         name: "Yanis Hasan",
//         email: "hasan@gmail.com",
//         phone: "010ee101",
//     }
//     collection.insertOne(user)
//         .then(() => {
//             console.log('data inserted')
//         })

//     // client.close();
// });
async function run() {
    try {
        await client.connect();
        const database = client.db("mongo-crud");
        const usersCollection = database.collection("users");
        // create a document to insert
        // const user = {
        //     name: "Jabir Hussain",
        //     email: "jabi@gmail.com",
        //     phone: "01010212101",
        // }
        // const result = await users.insertOne(user);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);

        // GET API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

        // GET API With
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const result = await usersCollection.findOne(query);
            console.log(result);
            res.send(result);
        })


        // POST API
        app.post('/users', async (req, res) => {
            console.log('hiting users api', req.body);
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        })

        // DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const result = await usersCollection.deleteOne(query);
            console.log(result);
            res.send(result)
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Reading From Backend');
})

app.listen(port, () => {
    console.log("listing from port: ", port);
})