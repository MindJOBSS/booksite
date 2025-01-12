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
    const response = await db.query("SELECT * FROM items ORDER BY id ASC");
    bookContent = response.rows;
    res.render("index.ejs" , {
        contents : bookContent
    });
});

app.get("/new" , (req , res) => {
    res.render("form.ejs" , {
        heading: "New Book",
        submit: "Submit Book"
    });
});

app.post("/books" , async (req , res) => {
    const date = String(getCurrentDate());
    const data = req.body;
    await db.query("INSERT INTO items (isbn , title , content , rating , recent)VALUES ($1, $2 , $3 , $4 , $5);" 
    , [data.isbn , data.title , data.content , data.rating , date]);
    res.redirect("/");
});

app.post("/edit/:id" , async (req , res) => {
    const response = await db.query("SELECT * FROM items WHERE id = $1" , [req.params.id]);
    const data = response.rows;
    res.render("form.ejs" , {
        heading: "Edit Book",
        submit: "Submit Changes",
        content: data[0]
    });
});

app.post("/books/:id" , async (req , res) => {
    const data = req.body;
    const id = req.params.id;
    const date = getCurrentDate();
    await db.query("UPDATE items SET isbn = $1 , title = $2 , content = $3 , rating = $4 , recent = $5 WHERE id = $6" ,
        [data.isbn , data.title , data.content , data.rating , date , id]
    );
    res.redirect("/");
});

app.post("/delete/:id" , async (req , res) => {
    const id = req.params.id;
    await db.query("DELETE FROM items WHERE id = $1;" , 
        [id]
    );
    res.redirect("/");
});

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
}
