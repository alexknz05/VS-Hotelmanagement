const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Sample data
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET a single book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// POST a new book
app.post("/books", (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  books = books.filter((b) => b.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});