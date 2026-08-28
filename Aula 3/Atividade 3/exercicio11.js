const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

function cadastrarEvento(){

    const nome = readline.question("Digite o nome do evento: ");
    const data_evento = readline.question("Digite a data do evento: ");
    
    const insert = "INSERT INTO eventos (nome, data_evento) VALUES (?,?)";

    conexao.query(insert,[nome, data_evento], function (erro){
        if(erro){
            console.log("Erro ao cadastrar evento.")
            console.log(erro);
        } else {
            console.log("Evento cadastrado com sucesso!");
        }

        menu();

    });
}

function listarEventos(){

    const sql = "SELECT * FROM eventos ORDER BY data_evento";

    conexao.query(sql, function(erro, eventos){

        if(erro){
            console.log("Erro ao listar eventos!");
        } else{
            console.log("=====EVENTOS=====");
            eventos.forEach(function(evento){
                console.log(
                    evento.id," - ",
                    evento.nome," - ",
                    evento.data_evento
                );
            });
        }

        menu();

    });   
}

function excluirEvento(){

    const id = readline.questionInt("Digite o ID do evento: ");
    const deletar = "DELETE FROM eventos WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir evento!");
        } else if( resultado.affectedRows === 0 ){
            console.log("Evento não encontrado!");
        } else {
            console.log("Evento excluido com sucesso!");
        }

        menu();

    });
}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar evento",
        "\n2 - Listar eventos",
        "\n3 - Excluir evento",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarEvento();

    }else if ( opcao === 2){

        listarEventos();

    }else if (opcao === 3){

        excluirEvento();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();