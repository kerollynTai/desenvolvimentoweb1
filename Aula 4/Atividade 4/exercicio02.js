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

    conexao.query(insert,[nome,preco,quantidade,id], function(erro){

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

function atualizarProduto(){

    const nome = readline.question("Informe o nome atualizado: ");
    const preco = readline.question("Informe o preco atualizado: ");
    const quantidade = readline.questionInt("Informe a quantidade atualizado: ");
 
    const id = readline.question("Informe o id do produto que terá os dados atualizado: ");
 
    const update = `UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?`;

    conexao.query(update, [nome, preco, quantidade, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o produto.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Produto não encontrado.");
        } else {
            console.log("Produto atualizado com sucesso!");
        }
 
        menu();

    });

}

function menu(){
    console.log(
        "\n=====MENU=====",
        "\n1 - Cadastrar produto",
        "\n2 - Listar produtos",
        "\n3 - Excluir produto",
        "\n4 - Atualizar produto",
        "\n0 - Sair"
    );

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if(opcao === 1){

        cadastrarProduto();

    }else if ( opcao === 2){

        listarProdutos();

    }else if (opcao === 3){

        excluirProduto();

    }else if (opcao===4){
        
        atualizarProduto();

    }else if(opcao === 0 ){

        console.log("Programa encerrado!");
        conexao.end();

    }else{

        console.log("Opção inválida!");
        menu();

    }
    
}

menu();