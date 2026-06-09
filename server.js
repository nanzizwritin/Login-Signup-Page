const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");

const app = express();

const db = new Database("users.db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
)
`);

app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    try {
        const stmt = db.prepare(`
            INSERT INTO users (email, password)
            VALUES (?, ?)
        `);

        stmt.run(email, password);

        res.json({
            success: true
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: "User already exists"
        });
    }
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = db.prepare(`
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `).get(email, password);

    if (user) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }

});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});