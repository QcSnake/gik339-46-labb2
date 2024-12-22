const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // 3

const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const db = new sqlite3.Database("./gik339-labb2.db"); // 3
const sql = "SELECT * FROM USERS";

server.get("/users", (req, res) => {
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send("Något gick fel med databasen!");
      return;
    }
    res.send(rows);
  });
}); //3

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:3000`);
});
