const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa"
});

function cadastrarTarefa(){

    const descricao  = readline.question("Digite a descrição da tarefa: ");
    
    if(descricao === ""){
        console.log("Impossível registrar descrição, campo vazio!")
        cadastrarTarefa();
    } else{
        const responsavel = readline.question("Digite o responsavel pela tarefa: ");
    
        const insert = "INSERT INTO tarefas (descricao, responsavel) VALUES (?,?)";

        conexao.query(insert,[descricao, responsavel], function (erro){
            if(erro){
                console.log("Erro ao cadastrar tarefa.")
                console.log(erro);
            } else {
                console.log("Tarefa cadastrada com sucesso!");
            }

        menu();

    });
    }
    
}

function listarTarefas(){

    const sql = "SELECT * FROM tarefas";

    conexao.query(sql, function(erro, tarefas){

        if(erro){
            console.log("Erro ao listar tarefas!");
        } else{
            console.log("=====TAREFAS=====");
            tarefas.forEach(function(tarefa){
                console.log(
                    tarefa.id," - ",
                    tarefa.descricao," - ",
                    tarefa.responsavel
                );
            });
        }

        menu();

    });   
}

function excluirTarefa(){

    const id = readline.questionInt("Digite o ID da tarefa: ");
    const deletar = "DELETE FROM tarefas WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir tarefa!");
        } else if( resultado.affectedRows === 0 ){
            console.log("Tarefa não encontrada!");
        } else {
            console.log("Tarefa excluida com sucesso!");
        }

        menu();

    });
}

function atualizarTarefa(){

    const descricao = readline.question("Informe a descrição atualizado da tarefa: ");
    const responsavel = readline.question("Informe o responsável atualizado: ");
 
    const id = readline.question("Informe o id da tarefa que terá os dados atualizados: ");
 
    const update = `UPDATE tarefas SET descricao = ?, responsavel = ? WHERE id = ?`;

    conexao.query(update, [descricao, responsavel, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o tarefa.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Tarefa não encontrado.");
        } else {
            console.log("Tarefa atualizado com sucesso!");
        }
 
        menu();

    });

}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar tarefa",
        "\n2 - Listar tarefas",
        "\n3 - Excluir tarefa",
        "\n4 - Atualizar tarefa",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarTarefa();

    }else if ( opcao === 2){

        listarTarefas();

    }else if (opcao === 3){

        excluirTarefa();

    }else if(opcao === 4){

        atualizarTarefa();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();