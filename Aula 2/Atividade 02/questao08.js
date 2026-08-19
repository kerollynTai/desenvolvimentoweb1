const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola",
})

const nome = "Inglês aplicado";
const professor   = "Jorge";
const aulas_semanais = 2

const insert = "INSERT INTO  disciplinas (nome, professor, aulas_semanais) VALUES (?,?,?)";

conexao.query(insert,[nome, professor, aulas_semanais], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar disciplina.");
        console.log(erro);
    } else {
        console.log("Disciplina cadastrado com sucesso!");
    }

});

const id = 2;
const deletar = "DELETE FROM  disciplinas WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o disciplina.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Disciplina não encontrado!");
    }else{
        console.log("Disciplina excluída com sucesso!");
    }

    conexao.end();
});