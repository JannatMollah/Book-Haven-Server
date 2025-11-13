const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ClientEncryption, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");
require("dotenv").config()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wbnbgws.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    res.status(401).send({
      message: "token not found"
    })
  }
  const token = authorization.split(' ')[1]



  try {
    await admin.auth().verifyIdToken(token)
    next()
  } catch (error) {
    res.status(401).send({
      message: "unauthorized access"
    })
  }

  next()

}




async function run() {
  try {
    // await client.connect();

    const db = client.db('BookHaven')
    const bookCollection = db.collection('Books')

    app.get('/books', async (req, res) => {
      const result = await bookCollection.find().toArray()

      res.send(result)
    })

    app.post('/books', async (req, res) => {
      const data = req.body

      const result = await bookCollection.insertOne(data)
      res.send({
        success: true,
        result
      })
    })

    app.get('/books/:id', verifyToken, async (req, res) => {
      const { id } = req.params
      const objectid = new ObjectId(id)
      const result = await bookCollection.findOne({ _id: objectid })
      res.send({
        success: true,
        result
      })
    })

    app.put('/books/:id', async (req, res) => {
      const { id } = req.params
      const data = req.body
      const objectid = new ObjectId(id)
      const filter = { _id: objectid }
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
      const { id } = req.params
      const objectid = new ObjectId(id)

      const result = await bookCollection.deleteOne({ _id: objectid })

      res.send({
        success: true,
        result
      })
    })

    app.get('/latest', async (req, res) => {
      const result = await bookCollection.find().limit(8).toArray()

      res.send(result)
    })






    // await client.db("admin").command({ ping: 1 });
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
