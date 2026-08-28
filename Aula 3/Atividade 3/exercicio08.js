const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

function cadastrarCurso(){

    const nome = readline.question("Digite o nome do curso: ");
    const carga_horaria= readline.question("Digite a carga horaria do curso: ");
    
    const insert = "INSERT INTO cursos (nome, carga_horaria) VALUES (?,?)";

    conexao.query(insert,[nome, carga_horaria ], function (erro){
        if(erro){
            console.log("Erro ao cadastrar curso.")
            console.log(erro);
        } else {
            console.log("Curso cadastrado com sucesso!");
        }

        menu();

    });
}

function listarCursos(){

    const sql = "SELECT * FROM cursos";

    conexao.query(sql, function(erro, cursos){

        if(erro){
            console.log("Erro ao listar cursos!");
        } else{
            console.log("=====CURSOS=====");
            cursos.forEach(function(curso){
                console.log(
                    curso.id," - ",
                    curso.nome," - ",
                    curso.carga_horaria
                );
            });
        }

        menu();

    });   
}

function excluirCurso(){

    const id = readline.questionInt("Digite o ID do curso: ");
    const deletar = "DELETE FROM curso WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir curso!");
        } else if( resultado.affectedRows === 0 ){
            console.log("Curso não encontrado!");
        } else {
            console.log("Curso excluido com sucesso!");
        }

        menu();

    });
}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar curso",
        "\n2 - Listar curso",
        "\n3 - Excluir curso",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao === 1){

        cadastrarCurso();

    }else if ( opcao === 2){

        listarCursos();

    }else if (opcao === 3){

        excluirCurso();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();