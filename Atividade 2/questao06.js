const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "locadora",
})

const titulo = "Frozen";
const ano = 2013;

const insert = "INSERT INTO  filmes (titulo, ano) VALUES (?,?)";

conexao.query(insert,[titulo, ano], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar filme.");
        console.log(erro);
    } else {
        console.log("Filme cadastrado com sucesso!");
    }

});

const id = 2;
const deletar = "DELETE FROM  filmes WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o filme.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Filme não encontrado!");
    }else{
        console.log("Filme excluído com sucesso!");
    }

    conexao.end();
});