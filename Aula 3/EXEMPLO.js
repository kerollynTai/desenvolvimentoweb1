const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",//local onde esta (quando for site sera o link)
    user: "root",
    password: "root",
    database: "escola",
})

//Dados que serão cadastrados
const nome = "Maria";
const email = "maria@email.com";

//Comandos SQL
const insert = "INSERT INTO alunos (nome, email) VALUES (?,?)"; //fazer inserção dos dados (? para minimizar ataques)

//Envia os dados para o MySQL
conexao.query(insert,[nome, email], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar.");
        console.log(erro);
    } else {
        console.log("Aluno cadastrado com sucesso!");
    }

    conexao.end();
})

//ID do aluno que será excluído
const id = 2;
const deletar = "DELETE FROM  alunos WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o aluno.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Aluno não encontrado!");
    }else{
        console.log("Aluno excluído com sucesso");
    }

    conexao.end();
});