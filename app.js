import express from "express";
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

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port , () => {
    console.log(`hey i am working on ${port}`);
});

app.get("/" , (req , res) => {
    res.render("index.ejs");
});
