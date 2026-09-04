const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola2"
});

function cadastrarAluno(){

    const nome = readline.question("Digite o nome do aluno: ");
    const email = readline.question("Digite o email do aluno: ");
    const endereco = readline.question("Digite o endereço do aluno: ");
    const matricula = readline.question("Digite a matricula do aluno: ");
    const curso = readline.question("Digite o curso do aluno: ");
    const serie = readline.question("Digite a serie do aluno: ");
    
    const insert = "INSERT INTO Alunos (nome,email, endereco, matricula, curso, serie) VALUES (?,?,?,?,?,?)";

    conexao.query(insert,[nome,email,endereco,matricula,curso, serie], function (erro){
        if(erro){
            console.log("Erro ao cadastrar aluno.")
            console.log(erro);
        } else {
            console.log("Aluno cadastrado com sucesso!");
        }

        menu();

    });
}

function listarAlunos(){

    const sql = "SELECT * FROM Alunos";

    conexao.query(sql, function(erro, Alunos){

        if(erro){
            console.log("Erro ao listar alunos!");
        } else{
            console.log("=====ALUNOS=====");
            Alunos.forEach(function(Aluno){
                console.log(
                    Aluno.id," - ",
                    Aluno.nome," - ",
                    Aluno.email
                );
            });
        }

        menu();

    });   
}

function excluirAluno(){

    const id = readline.questionInt("Digite o ID do aluno: ");
    const sql = "SELECT * FROM Alunos WHERE id = ?";

    conexao.query(sql, [id], function (erro,resultados){

        const aluno = resultados[0];
        console.log("\Aluno encontrado:",
            "\nNome: ",aluno.nome,
            "\nEmail: ", aluno.email
        );

        const validar = readline.question("\nDeseja excluir? (S/N): ");
        
        if(validar ==="s" || validar === "S"){
            const deletar = "DELETE FROM Alunos WHERE id = ?";

            conexao.query(deletar,[id], function(erro, resultado){

                if(erro){
                    console.log("Erro ao excluir aluno!");
                } else if( resultado.affectedRows === 0 ){
                    console.log("Aluno não encontrado!");
                } else {
                    console.log("Aluno excluido com sucesso!");
                }

                menu();
            });

        } else if(validar ==="n" || validar ==="N"){
            console.log("Aluno não excluído!");
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
        "\n1 - Cadastrar aluno",
        "\n2 - Listar alunos",
        "\n3 - Excluir aluno",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if(opcao === 1){

        cadastrarAluno();

    }else if ( opcao === 2){

        listarAlunos();

    }else if (opcao === 3){

        excluirAluno();

    }else if (opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();