const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "revendedora_automotiva"
});

function cadastrarVeiculo(){

    const modelo  = readline.question("Digite o modelo do veiculo: ");
    const placa  = readline.question("Digite a placa do veículo: ");
    
    const insert = "INSERT INTO veiculos (modelo, placa) VALUES (?,?)";

    conexao.query(insert,[modelo, placa], function (erro){
        if(erro){
            console.log("Erro ao cadastrar veículo.")
            console.log(erro);
        } else {
            console.log("Veículo cadastrado com sucesso!");
        }

        menu();

    });
}

function listarVeiculos(){

    const sql = "SELECT * FROM veiculos";

    conexao.query(sql, function(erro, veiculos){

        if(erro){
            console.log("Erro ao listar veículos!");

        }else{
            if (veiculos == ""){

                console.log("Nenhum veículo cadastrado.")

            } else{

                console.log("=====VEICULOS=====");
                veiculos.forEach(function(veiculo){

                    console.log(
                        veiculo.id," - ",
                        veiculo.modelo," - ",
                        veiculo.placa
                    );

                });
            }
        }

        menu();

    });   
}

function excluirVeiculos(){

    const id = readline.questionInt("Digite o ID do veículo: ");
    const sql = "SELECT * FROM veiculos WHERE id = ?";

    conexao.query(sql, [id], function (erro,resultados){

        const veiculo = resultados[0];
        console.log("\nVeículo encontrado:",
            "\nModelo: ",veiculo.modelo,
            "\nPlaca: ", veiculo.placa
        );

        const validar = readline.question("\nDeseja excluir? (S/N): ");
        
        if(validar ==="s" || validar === "S"){
            const deletar = "DELETE FROM veiculos WHERE id = ?";

            conexao.query(deletar,[id], function(erro, resultado){

                if(erro){
                    console.log("Erro ao excluir veiculo!");
                } else if( resultado.affectedRows === 0 ){
                    console.log("Veiculo não encontrado!");
                } else {
                    console.log("Veiculo excluido com sucesso!");
                }

                menu();
            });

        } else if(validar ==="n" || validar ==="N"){
            console.log("Veiculo não excluído!");
            menu();
        } else{
            console.log("Opção inválida!");
            menu();
        }
    });
}

    


function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar veículo",
        "\n2 - Listar veículos",
        "\n3 - Excluir veículo",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarVeiculo();

    }else if ( opcao === 2){

        listarVeiculos();

    }else if (opcao === 3){

        excluirVeiculos();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();