const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "instituicao",
})

const nome = "Recursos humanos";
const carga_horaria = "1600";

const insert = "INSERT INTO  cursos (nome, carga_horaria) VALUES (?,?)";

conexao.query(insert,[nome, carga_horaria], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar curso.");
        console.log(erro);
    } else {
        console.log("Curso cadastrado com sucesso!");
    }

});

const id = 3;
const deletar = "DELETE FROM  cursos WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o curso.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Curso não encontrado!");
    }else{
        console.log("Curso excluído com sucesso!");
    }

    conexao.end();
});