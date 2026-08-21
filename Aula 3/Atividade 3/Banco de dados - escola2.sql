CREATE DATABASE escola2;

USE escola2;

CREATE TABLE Alunos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100),
    email VARCHAR(100),
    endereco VARCHAR(100),
    matricula VARCHAR(100),
    curso VARCHAR(100),
    serie VARCHAR(100)
);

SELECT * FROM Alunos;

