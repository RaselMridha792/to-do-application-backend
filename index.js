require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.epzmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const ToDoCollection = client
      .db("to-do-application")
      .collection("to-do-collection");
    // await client.connect();

    app.post("/tasks", async (req, res) => {
      const userData = req.body;
      const result = await ToDoCollection.insertOne(userData);
      res.send(result);
    });

    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await ToDoCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ToDoCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: false };

      const updatedFields = {};
      if (data.taskName !== undefined) {
        updatedFields.taskName = data.taskName;
      }
      if (data.description !== undefined) {
        updatedFields.description = data.description;
      }
      if (data.category !== undefined) {
        updatedFields.category = data.category;
      }
      if (data.date !== undefined) {
        updatedFields.date = data.date;
      }
      const updatedDoc = {
        $set: {
          updatedFields,
        },
      };
      const result = await ToDoCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("to do application is running");
});

app.listen(port, () => {
  console.log(`application is running on port:${port}`);
});
