const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wbnbgws.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const db = client.db('BookHaven');
    const booksCollection = db.collection('Books');
    const myBooksCollection = db.collection('MyBooks');
    const commentsCollection = db.collection('Comments');

    // Books routes
    app.get('/books', async (req, res) => {
      try {
        const books = await booksCollection.find().toArray();
        res.send(books);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch books' });
      }
    });

    app.get('/books/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const book = await booksCollection.findOne({ _id: new ObjectId(id) });
        if (!book) {
          return res.status(404).send({ error: 'Book not found' });
        }
        res.send({ success: true, result: book });
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch book' });
      }
    });

    app.post('/books', async (req, res) => {
      try {
        const book = req.body;
        const result = await booksCollection.insertOne(book);
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ error: 'Failed to add book' });
      }
    });

    app.put('/books/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const book = req.body;
        const result = await booksCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: book }
        );
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ error: 'Failed to update book' });
      }
    });

    app.delete('/books/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ error: 'Failed to delete book' });
      }
    });

    // Latest books
    app.get('/latest', async (req, res) => {
      try {
        const books = await booksCollection.find().limit(8).toArray();
        res.send(books);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch latest books' });
      }
    });

    // My Books routes
    app.get('/my-books', async (req, res) => {
      try {
        const { userEmail } = req.query;
        const books = await myBooksCollection.find({ userEmail }).toArray();
        res.send(books);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch my books' });
      }
    });

    app.post('/my-books', async (req, res) => {
      try {
        const book = req.body;
        // Check if book already exists in user's collection
        const existingBook = await myBooksCollection.findOne({
          bookId: book.bookId,
          userEmail: book.userEmail
        });

        if (existingBook) {
          return res.status(400).send({ error: 'Book already in collection' });
        }

        const result = await myBooksCollection.insertOne(book);
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ error: 'Failed to add book to collection' });
      }
    });

    app.delete('/my-books/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const result = await myBooksCollection.deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ error: 'Failed to remove book from collection' });
      }
    });

    // Comments routes
    app.get('/comments/:bookId', async (req, res) => {
      try {
        const { bookId } = req.params;
        const comments = await commentsCollection.find({ bookId }).sort({ timestamp: -1 }).toArray();
        res.send(comments);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch comments' });
      }
    });

    app.post('/comments', async (req, res) => {
      try {
        const comment = req.body;
        const result = await commentsCollection.insertOne(comment);
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ error: 'Failed to add comment' });
      }
    });

    // Top rated books
    app.get('/top-rated', async (req, res) => {
      try {
        const books = await booksCollection.find().sort({ rating: -1 }).limit(3).toArray();
        res.send(books);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch top rated books' });
      }
    });

    // Health check
    app.get('/', (req, res) => {
      res.send('Book Haven Server is running!');
    });

  } finally {
    // Client will stay connected
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Book Haven server running on port ${port}`);
});