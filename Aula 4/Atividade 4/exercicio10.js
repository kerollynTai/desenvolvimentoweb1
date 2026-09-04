const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "laboratorio"
});

function cadastrarComputador(){

    const patrimonio  = readline.question("Digite o patrimônio do computador: ");
    const localizacao  = readline.question("Digite a localização do computador: ");
    
    const insert = "INSERT INTO computadores (patrimonio, localizacao) VALUES (?,?)";

    conexao.query(insert,[patrimonio, localizacao], function (erro){
        if(erro){
            console.log("Erro ao cadastrar computador.")
            console.log(erro);
        } else {
            console.log("Computador cadastrado com sucesso!");
        }

        menu();

    });
}

function listarComputadores(){

    const sql = "SELECT * FROM computadores";

    conexao.query(sql, function(erro, computadores){

        if(erro){
            console.log("Erro ao listar computadores!");
        } else{
            console.log("=====COMPUTADORES=====");
            computadores.forEach(function(computador){
                console.log(
                    computador.id," - ",
                    computador.patrimonio," - ",
                    computador.localizacao
                );
            });
        }

        menu();

    });   
}

function excluirComputador(){

    const id = readline.questionInt("Digite o ID do computador: ");
    const sql = "SELECT * FROM computadores WHERE id = ?";

    conexao.query(sql, [id], function (erro,resultados){

        const computador = resultados[0];
        console.log("\nComputador encontrado:",
            "\nPatrimônio: ",computador.patrimonio,
            "\nLocalição: ", computador.localizacao
        );

        const validar = readline.question("\nDeseja excluir? (S/N): ");
        
        if(validar ==="s" || validar === "S"){
            const deletar = "DELETE FROM computadores WHERE id = ?";

            conexao.query(deletar,[id], function(erro, resultado){

                if(erro){
                    console.log("Erro ao excluir computador!");
                } else if( resultado.affectedRows === 0 ){
                    console.log("Computador não encontrado!");
                } else {
                    console.log("Computador excluido com sucesso!");
                }

                menu();
            });

        } else if(validar ==="n" || validar ==="N"){
            console.log("Computador não excluído!");
            menu();
        } else{
            console.log("Opção inválida!");
            menu();
        }
    });
}

function atualizarComputador(){

    const patrimonio = readline.question("Informe o patrimonio atualizado do computador: ");
    const localizacao = readline.question("Informe a localizacao atualizado: ");
 
    const id = readline.question("Informe o id do computador que terá os dados atualizados: ");
 
    const update = `UPDATE computadores SET patrimonio = ?, localizacao = ? WHERE id = ?`;

    conexao.query(update, [patrimonio, localizacao, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o computador.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Computador não encontrado.");
        } else {
            console.log("Computador atualizado com sucesso!");
        }
 
        menu();

    });

}



function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar computador",
        "\n2 - Listar computador",
        "\n3 - Excluir computador",
        "\n4 - Atualizar computador",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarComputador();

    }else if ( opcao === 2){

        listarComputadores();

    }else if (opcao === 3){

        excluirComputador();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else if(opcao === 4){

        atualizarComputador();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();