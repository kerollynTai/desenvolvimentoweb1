const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca"
});

function cadastrarLivros(){

    const titulo = readline.question("Informe o nome do livro: ");
    const autor = readline.question("Informe o autor do livro: ");

    const insert = "INSERT INTO livros (titulo, autor) VALUES (?,?)";

    conexao.query(insert,[titulo,autor], function(erro){

        if(erro){
            console.log("Erro ao cadastrar livro!");
            console.log(erro);
        }else{
            console.log("Livro cadastrado com sucesso!")
        }

        menu();

    });
}

function listarLivros(){

    const sql = "SELECT * FROM livros";

    conexao.query(sql, function(erro, livros){

        if(erro){
            console.log("Erro ao cadastrar livro!");
            console.log(erro)
        }else{
            console.log("\n=====LIVROS=====",);
            livros.forEach(function(livro){
                console.log(
                    livro.id," - ",
                    livro.titulo, " - ",
                    livro.autor
                );
            });
        }

        menu();

    });
}

function excluirLivros(){

    const id = readline.questionInt("Informe o id do livro que deseja excluir: ");
    const deletar = "DELETE FROM livros WHERE id = ?";

    conexao.query(deletar,[id], function(erro,resultado){

        if(erro){
            console.log("Erro ao excluir livro!");
        } else if( resultado.affectedRows === 0 ){
            console.log("livro não encontrado!");
        } else {
            console.log("Livro excluido com sucesso!");
        }

        menu();
    });

}

function atualizarAluno(){

    const titulo = readline.question("Informe o título atualizado do aluno: ");
    const autor = readline.question("Informe o autor atualizado: ");
 
    const id = readline.question("Informe o id do livro que terá os dados atualizado: ");
 
    const update = `UPDATE livros SET titulo = ?, autor = ? WHERE id = ?`;

    conexao.query(update, [titulo, autor, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o livro.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Livro não encontrado.");
        } else {
            console.log("Livro atualizado com sucesso!");
        }
 
        menu();

    });

}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar livro",
        "\n2 - Listar livros",
        "\n3 - Excluir livro",
        "\n4 - Atualizar livro",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if(opcao === 1){

        cadastrarLivros();

    }else if ( opcao === 2){

        listarLivros();

    }else if (opcao === 3){

        excluirLivros();

    }else if (opcao===4){
        
        atualizarAluno();

    }else if(opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();