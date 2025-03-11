import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = { users: [] }; // Ensure default data exists
    await db.write();
  }
}
await initDB();

app.get("/users", async (req, res) => {
    await db.read();
    res.json(db.data.users);
  });

app.post("/users", async (req, res) => {
    await db.read();
    const newUser = req.body;
    db.data.users.push(newUser);
    await db.write();
    res.status(201).json(newUser);
});

app.delete("/users/:id", async (req, res) => {
    await db.read();
    const userId = req.params.id;
    db.data.users = db.data.users.filter((user) => user.id !== userId);
    await db.write();
    res.status(204).send();
});