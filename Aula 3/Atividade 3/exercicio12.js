const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "revendeora_automotiva"
});

