const mysql = require("mysql2");
const{CONNREFUSED} = require("node:dns");
const readline=require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja"
});

function cadastrarProduto(){
    
    const nome = readline.question("Digite o nome do produto: ");
    const preco = readline.question("Digite o preço do produto: ");
    const quantidade = readline.question("Digite a quantidade de produto: ");

    const insert = "INSERT INTO produtos(nome, preco, quantidade) VALUES (?,?,?)";

    conexao.query(insert,[nome,preco,quantidade], function(erro){

        if(erro){
            console.log("Erro ao cadastrar produto!");
            console.log(erro);
        } else{
            console.log("Produto cadastrado com sucesso!");
        }

        menu();

    });
}

function listarProdutos(){
    
    const sql = "SELECT * FROM produtos";

    conexao.query(sql, function(erro, produtos){

        if(erro){
            console.log("Erro ao listar produtos!");
        }else{
            console.log("=====PRODUTOS=====");
            produtos.forEach(function(produto){
                console.log(
                    produto.id, " - ",
                    produto.nome, " - ",
                    produto.preco, " - ",
                    produto.quantidade
                );
            });
        }

        menu();

    });
}

function excluirProduto(){

    const id = readline.questionInt("Digite o id do produto: "); 
    const deletar = "DELETE FROM produtos WHERE id = ?";

    conexao.query(deletar,[id], function(erro, resultado){

        if(erro){
            console.log("Erro ao excluir produto!");
        }else if( resultado.affectedRows === 0){
            console.log("Produto não encontrado!");
        } else {
            console.log("Produto excluido com sucesso!");
        }

        menu();

    });
}

function menu(){

    console.log(
        "\n=====MENU=====",
        "\n\n1 - Cadastrar produto",
        "\n2 - Listar produtos",
        "\n3 - Excluir produto",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Informe uma opção: ");

    if(opcao === 1){
        return cadastrarProduto();
    } else if (opcao === 2){
        return listarProdutos();
    } else if(opcao === 3){
        excluirProduto();
    } else if(opcao === 0){
        console.log("Programa encerrado!");
        conexao.end();
    }else{
        console.log("Opção inválida!");
        menu();
    }
}

menu();