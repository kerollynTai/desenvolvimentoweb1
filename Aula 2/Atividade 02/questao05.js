const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa",
})

const nome = "Juliana Costa ";
const telefone = "47977770000";

const insert = "INSERT INTO  clientes (nome, telefone) VALUES (?,?)";

conexao.query(insert,[nome, telefone], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar cliente.");
        console.log(erro);
    } else {
        console.log("Cliente cadastrado com sucesso!");
    }

});

const id = 2;
const deletar = "DELETE FROM  clientes WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o cliente.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Cliente não encontrado!");
    }else{
        console.log("Cliente excluído com sucesso!");
    }

    conexao.end();
});