const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce",
});

const nome = "Mouse";
const preco = 75.00;

const insert = "INSERT INTO produtos (nome, preco) VALUES (?,?)";

conexao.query(insert,[nome, preco], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar produto.");
        console.log(erro);
    } else {
        console.log("Produto cadastrado com sucesso!");
    }

});

const id = 5;

const deletar = "DELETE FROM  produtos WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir produto.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Produto não encontrado!");
    }else{
        console.log("Produto excluído com sucesso");
    }

    conexao.end();
});