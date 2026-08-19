const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa",
})

const nome = "Luisa";
const cargo  = "Atendente";
const salario = 2200.00

const insert = "INSERT INTO  funcionarios (nome, cargo, salario) VALUES (?,?,?)";

conexao.query(insert,[nome, cargo,salario], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar funcionario.");
        console.log(erro);
    } else {
        console.log("Funcionario cadastrado com sucesso!");
    }

});

const id = 50;
const deletar = "DELETE FROM  funcionarios WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o funcionario.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Funcionario não encontrado!");
    }else{
        console.log("Funcionario excluído com sucesso!");
    }

    conexao.end();
});