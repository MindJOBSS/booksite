import express, { response } from "express";
import axios from "axios";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "books",
    password: "LetsCode27",
    port: 5432
});

db.connect();

let bookContent = []

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port , () => {
    console.log(`hey i am working on ${port}`);
});

app.get("/" , async (req , res) => {
    const response = await db.query("SELECT * FROM items");
    bookContent = response.rows;
    res.render("index.ejs" , {
        contents : bookContent
    });
});
