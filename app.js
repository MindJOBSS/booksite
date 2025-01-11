import express from "express";
import axios from "axios";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port , () => {
    console.log(`hey i am working on ${port}`);
});

app.get("/" , (req , res) => {
    res.render("index.ejs");
});
