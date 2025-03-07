const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Sample Schema & Model
const TodoSchema = new mongoose.Schema({ text: String });
const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/", (req, res) => res.send("MERN Stack Backend Running!"));

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.json(newTodo);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

