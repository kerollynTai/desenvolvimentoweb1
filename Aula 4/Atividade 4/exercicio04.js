const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "catalogo_jogos"
});

function cadastrarJogo(){

    const nome = readline.question("Digite o nome do jogo: ");
    const genero = readline.question("Digite o genero do jogo: ");
    
    const insert = "INSERT INTO jogos (nome, genero) VALUES (?,?)";

    conexao.query(insert,[nome, genero], function (erro){
        if(erro){
            console.log("Erro ao cadastrar jogo.")
            console.log(erro);
        } else {
            console.log("Jogo cadastrado com sucesso!");
        }

        menu();

    });
}

function listarJogo(){

    const sql = "SELECT * FROM jogos";

    conexao.query(sql, function(erro, jogos){

        if(erro){
            console.log("Erro ao listar jogos!");
        } else{
            console.log("=====JOGOS=====");
            jogos.forEach(function(jogo){
                console.log(
                    jogo.id," - ",
                    jogo.nome," - ",
                    jogo.genero
                );
            });
        }

        menu();

    });   
}

function excluirJogo(){

    const id = readline.questionInt("Digite o ID do jogo: ");
    const deletar = "DELETE FROM jogos WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir jogo!");
        } else if( resultado.affectedRows === 0 ){
            console.log("Jogo não encontrado!");
        } else {
            console.log("Jogo excluido com sucesso!");
        }

        menu();

    });
}

function atualizarJogo(){

    const nome = readline.question("Informe o nome atualizado do jogo: ");
    const genero = readline.question("Informe o genero atualizado: ");
 
    const id = readline.question("Informe o id do jogo que terá os dados atualizado: ");
 
    const update = `UPDATE jogos SET nome = ?, genero = ? WHERE id = ?`;

    conexao.query(update, [nome, genero, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o jogo.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Jogo não encontrado.");
        } else {
            console.log("Jogo atualizado com sucesso!");
        }
 
        menu();

    });

}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar jogo",
        "\n2 - Listar jogos",
        "\n3 - Excluir jogo",
        "\n4 - Atualizar jogo",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if(opcao === 1){

        cadastrarJogo();

    }else if ( opcao === 2){

        listarJogo();

    }else if (opcao === 3){

        excluirJogo();

    }else if (opcao===4){
        
        atualizarJogo();

    }else if(opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();