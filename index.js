const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// assignment11
// NGk2G0veZGmhftdZ




async function run(req, res) {
    try {
        const uri = "mongodb+srv://assignment11:NGk2G0veZGmhftdZ@cluster0.kliinjg.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const serviceCollection = client.db('HappySmile').collection('services');
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
            console.log(services);
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            console.log(service);
            res.send(service);
        })
        app.post('/services', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await serviceCollection.insertOne(user);

            res.send(result);
            console.log(user);
        })

    }
    finally { }
}
run().catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.listen(port, (req, res) => {
    console.log('listening on port ' + port);
});