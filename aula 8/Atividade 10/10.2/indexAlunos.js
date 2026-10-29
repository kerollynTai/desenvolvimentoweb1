const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_alunos'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

app.listen(8083, function (){
    console.log
    ("Servidor rodando na url http://localhost:8083");
});

app.get("/", function(req,res){
    res.sendFile(__dirname+"/menu.html")
});


app.get("/cadastrar", function(req, res) {
    res.sendFile(__dirname + "/cadastrar.html");
});


app.get("/pesquisarCodigo", function (req, res) {

    const id = req.query.id;

    if (!id) {
        return res.sendFile(__dirname + "/pesquisarCodigo.html");
    }

    const selectAluno = "SELECT * FROM alunos WHERE id = ?";

    connection.query(selectAluno, [id], function (err, rows) {

        if (err) {
            console.error("Erro ao pesquisar aluno:", err);
            return res.status(500).send("Erro ao pesquisar aluno!");
        }

        if (rows.length === 0) {
            return res.send(`
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <title>Aluno não encontrado</title>
                </head>
                <body>
                    <h1>Aluno não encontrado!</h1>
                    <p>Não existe aluno cadastrado com esse código.</p>
                    <br>
                    <a href="/">Voltar ao menu principal</a>
                </body>
                </html>
            `);
        }

        const aluno = rows[0];

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Aluno encontrado</title>
            </head>
            <body>

                <h1>Aluno encontrado!</h1>

                <p><strong>Código:</strong> ${aluno.id}</p>
                <p><strong>Nome:</strong> ${aluno.nome}</p>
                <p><strong>Turma:</strong> ${aluno.turma}</p>
                <p><strong>Idade:</strong> ${aluno.idade}</p>
                <p><strong>Email:</strong> ${aluno.email}</p>
                <br>
                <a href="/">Voltar ao menu principal</a>

            </body>
            </html>
        `);
    });
});

app.get("/pesquisarNome", function (req, res) {

    const nome = req.query.nome;

    if (!nome || !nome.trim()) {
        return res.sendFile(__dirname + "/pesquisarNome.html");
    }

    const selectAluno = "SELECT * FROM alunos WHERE nome LIKE ?";

    connection.query(selectAluno, [`%${nome}%`], function (err, rows) {

        if (err) {

            console.error("Erro ao pesquisar aluno:", err);
            return res.status(500).send("Erro ao pesquisar aluno!");
        }

        if (rows.length === 0) {
            return res.send(`
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <title>Aluno não encontrado</title>
                </head>
                <body>
                    <h1>Aluno não encontrado!</h1>
                    <p>Não existe aluno cadastrado com esse nome.</p>
                    <br>
                    <a href="/">Voltar ao menu principal</a>
                </body>
                </html>
            `);
        }

        const aluno = rows[0];

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Alunos encontrados</title>
            </head>
            <body>

                <h1>Resultados para "${nome}"!</h1>

                ${rows.map(aluno => `
                    <p><strong>Código:</strong> ${aluno.id}</p>
                    <p><strong>Nome:</strong> ${aluno.nome}</p>
                    <p><strong>Turma:</strong> ${aluno.turma}</p>
                    <p><strong>Idade:</strong> R$ ${aluno.idade}</p>
                    <p><strong>Email:</strong> R$ ${aluno.email}</p>
                    <br>
                `)}

                <br>
                <a href="/">Voltar ao menu principal</a>

            </body>
            </html>
        `);
    });
});


app.post("/cadastrarAluno", function(req, res){
    const nome = req.body.nome;
    const turma = req.body.turma;
    const idade = req.body.idade;
    const email = req.body.email;

    const values = [nome, turma, idade, email];
    const insert = "INSERT INTO alunos (nome, turma, idade, email) VALUES(?,?,?,?)";

    connection.query(insert, values,
        function(err, result){
            if(err){
                console.error("Dados não inseridos", err);
                res.send("Erro");
            } else{
                console.log("Dados inseridos com sucesso!");
                res.redirect("/listar");
            }
        }
    );
});

app.get("/listar", function(req,res){
    const selectAll = "SELECT * FROM alunos";
    connection.query(selectAll, function(err, rows){
        
        if(!err){
            res.send(
            `<html>
                <head>
                    <title> Lista de alunos </title>
                </head>
                <body>

                    <h1> Lista de aunos:</h1>
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Turma</th>
                            <th>Idade</th>
                            <th>Email</th>
                        </tr>

                        ${rows.map(row=>`

                        <tr>

                            <td>${row.nome}</td>
                            <td>${row.turma}</td>
                            <td>${row.idade}</td>
                            <td>${row.email}</td>

                            <td><a href="/deletar/${row.id}">Deletar</a></td>

                            <td><a href="/atualizar-form/${row.id}">Alterar</a></td>

                        </tr>`).join('')}

                    </table>

                    <br>
                    <br>

                    <a href="/">Voltar ao menu</a>

                </body>

            </html>`);
        }else{
            console.error("Erro ao listar alunos!", err);
            res.status(500).setDefaultEncoding("Erro ao listar os dados!")
        }
    });
});

app.get("/deletar/:id", function (req,res){
    const idDoAluno = req.params.id;
    const deleteAluno = "DELETE FROM alunos WHERE id=?"

    connection.query(deleteAluno, [idDoAluno],(err,rows) =>{
        if(!err){
            console.log("Aluno excluído com sucesso!");
            res.redirect("/listar");
        }else{
            console.error("Erro ao excluir aluno", err);
            res.status(500).send("Erro ao excluir aluno!");
        }
    });
});

app.post("/atualizar/:id", (req,res)=>{

    const update = "UPDATE alunos SET nome = ?, turma = ?, idade = ?,  email = ? WHERE id=?";
    
    const nome = req.body.nome;
    const turma = req.body.turma;
    const idade = req.body.idade;
    const email = req.body.email;
    const id = req.params.id;

    connection.query(update,[nome, turma, idade, email, id],
        function(err, result){
            if(!err){
                console.log("Dados Atualizados com sucesso!");
                res.redirect("/listar");
            } else {
                console.log("Erro ao atualizar ", err);
                res.status(500).send("Erro ao atualizar!");
                res.redirect("/listar");
            }
        });
});

app.get("/atualizar-form/:id", function(req,res){
    const id = req.params.id;
    const selectAluno= ("SELECT * FROM alunos WHERE id=?")
 
    connection.query(selectAluno, [id], function(err, result){
        if(!err && result.length >0){
            const produto = result[0];
 
            res.send(`
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Atualizar Cadastro de Alunos</title>
                </head>
                <body>
                    <h1>Atualizar Cadastro de Alunos:</h1>
    
                    <form action="/atualizar/${id}" method="POST">
                        <label for="nome"> Nome do aluno</label> <br>
                        <input type="text" id="nome" name="nome" valor requerido=${produto.nome}> <br>
                        <br>
                        <label for="turma"> Turma</label> <br>
                        <input type="text" id="turma" name="turma" valor requerido=${produto.turma}> <br>
                        <br>
                        <label for="idade"> Idade</label> <br>
                        <input type="number" id="idade" name="idade" valor obrigatório=${produto.idade}> <br><br>
                        <br>
                        <label for="email">Email</label> <br>
                        <input type="email" id="email" name="email" valor obrigatório=${produto.email}> <br><br>
                        <br>
                        <input type="submit">
                        <br><br>
                        <a href="/listar">Listar alunos</a>
                    </form>
                </body>
                </html>
            `)
        } else {
            console.log("Erro ao obter dados do aluno", err);
            res.status(500).send("Erro ao obter dados do aluno")
        }
    });
});