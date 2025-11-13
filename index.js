const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ClientEncryption, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = "mongodb+srv://BookHaven:C635xrEtUSNNkNFW@cluster0.wbnbgws.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db('BookHaven')
    const bookCollection = db.collection('Books')

    app.get('/books', async (req, res) => {
        const result = await bookCollection.find().toArray()

        res.send(result)
    })

    app.post('/books', async (req, res) => {
      const data = req.body
      console.log(data);
      
        const result = await bookCollection.insertOne(data)
        res.send({
          success: true,
          result
        })
    })

    app.get('/books/:id', async (req, res) => {
      const {id} = req.params
      const objectid = new ObjectId(id)
        const result = await bookCollection.findOne({_id: objectid})
        res.send({
          success: true,
          result
        })
    })

    app.put('/books/:id', async (req, res) => {
      const {id} = req.params
      const data = req.body
      const objectid = new ObjectId(id)
      const filter = {_id: objectid}
      const update = {
        $set: data
      }
        const result = await bookCollection.updateOne(filter, update)

        res.send({
          success: true,
          result
        })
    })

    app.delete('/books/:id', async (req, res) => {
      const {id} = req.params
      const objectid = new ObjectId(id)

        const result = await bookCollection.deleteOne({_id: objectid})

        res.send({
          success: true,
          result
        })
    })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
