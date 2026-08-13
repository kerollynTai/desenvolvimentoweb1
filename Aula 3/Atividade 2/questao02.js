const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca",
});

const titulo = "Verity";
const autor = "Colleen Hoover";

const insert = "INSERT INTO livros (titulo, autor) VALUES (?,?)";

conexao.query(insert,[titulo, autor], function (erro) {

    if (erro){
        console.log("Erro ao cadastrar livro.");
        console.log(erro);
    } else {
        console.log("Livro cadastrado com sucesso!");
    }

});

const id = 2;
const deletar = "DELETE FROM  livros WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if(erro) {
        console.log("Erro ao excluir o livro.");
        console.log(erro);
    }else if(resultado.affectedRows === 0) {
        console.log("Livro não encontrado!");
    }else{
        console.log("Livro excluído com sucesso");
    }

    conexao.end();
});