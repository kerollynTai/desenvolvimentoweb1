const mysql = require("mysql2");

//conexão com o MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja",
})

const produto = "Notebook";
const quantidade   = 2;
const valor = 3500.00

const insert = "INSERT INTO  vendas (produto, quantidade, valor) VALUES (?,?,?)";

conexao.query(insert,[produto, quantidade, valor], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar venda.");
        console.log(erro);
    } else {
        console.log("Venda cadastrado com sucesso!");
    }

});

const id = 2;
const deletar = "DELETE FROM  vendas WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o venda.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Venda não encontrada!");
    }else{
        console.log("Venda excluída com sucesso!");
    }

    conexao.end();
});