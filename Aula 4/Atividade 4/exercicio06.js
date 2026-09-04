const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "locadora"
});

function cadastrarfilme(){

    const titulo = readline.question("Digite o titulo do filme: ");
    const ano = readline.question("Digite o ano do filme: ");
    
    const insert = "INSERT INTO filmes (titulo, ano) VALUES (?,?)";

    conexao.query(insert,[titulo, ano], function (erro){
        if(erro){
            console.log("Erro ao cadastrar filme.")
            console.log(erro);
        } else {
            console.log("Filme cadastrado com sucesso!");
        }

        menu();

    });
}

function listarFilmes(){

    const sql = "SELECT * FROM filmes ORDER BY titulo";

    conexao.query(sql, function(erro, filmes){

        if(erro){
            console.log("Erro ao listar filmes!");
        } else{
            console.log("=====FILMES=====");
            filmes.forEach(function(filme){
                console.log(
                    filme.id," - ",
                    filme.titulo," - ",
                    filme.ano
                );
            });
        }

        menu();

    });   
}

function excluirFilme(){

    const id = readline.questionInt("Digite o ID do filme: ");
    const deletar = "DELETE FROM filmes WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir filme!");
        } else if( resultado.affectedRows === 0 ){
            console.log("Filme não encontrado!");
        } else {
            console.log("Filme excluido com sucesso!");
        }

        menu();

    });
}

function atualizarFilme(){

    const titulo = readline.question("Informe o título atualizado do filme: ");
    const ano = readline.question("Informe o ano atualizado: ");
 
    const id = readline.question("Informe o id do filme que terá os dados atualizado: ");
 
    const update = `UPDATE filmes SET titulo = ?, ano = ? WHERE id = ?`;

    conexao.query(update, [titulo, ano, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o filme.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Filme não encontrado.");
        } else {
            console.log("Filme atualizado com sucesso!");
        }
 
        menu();

    });

}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar filme",
        "\n2 - Listar filmes",
        "\n3 - Excluir filme",
        "\n4 - Atualizar filme",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarfilme();

    }else if ( opcao === 2){

        listarFilmes();

    }else if (opcao === 3){

        excluirFilme();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else if(opcao === 4){

        atualizarFilme();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();