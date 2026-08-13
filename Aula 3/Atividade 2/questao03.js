const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola",
})

const nome = "Maria";
const disciplina = "Matemática";

const insert = "INSERT INTO professores (nome, disciplina) VALUES (?,?)";

conexao.query(insert,[nome, disciplina], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar professor.");
        console.log(erro);
    } else {
        console.log("Professor cadastrado com sucesso!");
    }

    conexao.end();
})
