const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa"
});

function cadastrarCliente(){

    const nome = readline.question("Digite o nome do cliente: ");
    const telefone = readline.question("Digite o telefone do cliente: ");
    
    const insert = "INSERT INTO clientes (nome, telefone) VALUES (?,?)";

    conexao.query(insert,[nome, telefone], function (erro){
        if(erro){
            console.log("Erro ao cadastrar cliente.")
            console.log(erro);
        } else {
            console.log("Cliente cadastrado com sucesso!");
        }

        menu();

    });
}

function listarClientes(){

    const sql = "SELECT * FROM clientes";

    conexao.query(sql, function(erro, clientes){

        if(erro){
            console.log("Erro ao listar clientes!");
        } else{
            console.log("=====CLIENTES=====");
            clientes.forEach(function(cliente){
                console.log(
                    cliente.id," - ",
                    cliente.nome," - ",
                    cliente.telefone
                );
            });
        }

        menu();

    });   
}

function excluirCliente(){

    const id = readline.questionInt("Digite o ID do cliente: ");
    const deletar = "DELETE FROM clientes WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir cliente!");
        } else if( resultado.affectedRows === 0 ){
            console.log("Cliente não encontrado!");
        } else {
            console.log("Cliente excluido com sucesso!");
        }

        menu();

    });
}

function atualizarCliente(){

    const nome = readline.question("Informe o nome atualizado do cliente: ");
    const telefone = readline.question("Informe o telefone atualizado: ");
 
    const id = readline.question("Informe o id do cliente que terá os dados atualizado: ");
 
    const update = `UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?`;

    conexao.query(update, [nome, telefone, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o cliente.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Cliente não encontrado.");
        } else {
            console.log("Cliente atualizado com sucesso!");
        }
 
        menu();

    });

}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar cliente",
        "\n2 - Listar clientes",
        "\n3 - Excluir cliente",
        "\n4 - Atualizar cliente",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if(opcao === 1){

        cadastrarCliente();

    }else if ( opcao === 2){

        listarClientes();

    }else if (opcao === 3){

        excluirCliente();

    }else if (opcao===4){
        
        atualizarCliente();

    }else if(opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();