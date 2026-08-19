const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola",
})

const nome = "Fernanda ";
const disciplina = "Programação";

const insert = "INSERT INTO professores (nome, disciplina) VALUES (?,?)";

conexao.query(insert,[nome, disciplina], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar professor.");
        console.log(erro);
    } else {
        console.log("Professor cadastrado com sucesso!");
    }

});

const id = 20;
const deletar = "DELETE FROM  professores WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o professor.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Professor não encontrado!");
    }else{
        console.log("Professor excluído com sucesso!");
    }

    conexao.end();
});