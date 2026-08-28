const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa2"
});

function cadastrarFuncionario(){

    const nome = readline.question("Digite o nome do funcionário: ");
    const cargo = readline.question("Digite o cargo do funcionário: ");
    
    const insert = "INSERT INTO funcionarios (nome, cargo) VALUES (?,?)";

    conexao.query(insert,[nome, cargo], function (erro){
        if(erro){
            console.log("Erro ao cadastrar funcionário.")
            console.log(erro);
        } else {
            console.log("Funcionário cadastrado com sucesso!");
        }

        menu();

    });
}

function listarFuncionarios(){

    const sql = "SELECT * FROM funcionarios";

    conexao.query(sql, function(erro, funcionarios){

        if(erro){
            console.log("Erro ao listar funcionários!");
        } else{
            console.log("=====FUNCIONÁRIOS=====");
            funcionarios.forEach(function(funcionario){
                console.log(
                    funcionario.id," - ",
                    funcionario.nome," - ",
                    funcionario.cargo
                );
            });
        }

        menu();

    });   
}

function excluirFuncionario(){

    const id = readline.questionInt("Digite o ID do funcionario: ");
    const validar = readline.question("Deseja mesmo excluir este funcionário?\n(s/n): ");
    const deletar = "DELETE FROM funcionarios WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(validar === "s" || validar === "S" ){
            if(erro){
                console.log("Erro ao excluir funcionário!");
            } else if( resultado.affectedRows === 0 ){
                console.log("Funcionário não encontrado!");
            } else {
                console.log("Funcionário excluido com sucesso!");
            }
        } else if(validar ==="n" || validar ==="N"){
            console.log("Funcionário não excluído!")
            menu();
        } else{
            console.log("Opção inválida!")
            excluirFuncionario();
        }

        menu();

    });
}


function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar funcionários",
        "\n2 - Listar funcionários",
        "\n3 - Excluir funcionário",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarFuncionario();

    }else if ( opcao === 2){

        listarFuncionarios();

    }else if (opcao === 3){

        excluirFuncionario();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();