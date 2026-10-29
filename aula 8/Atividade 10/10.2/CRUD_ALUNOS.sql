CREATE DATABASE crud_alunos;

USE crud_alunos;

CREATE TABLE alunos(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
turma VARCHAR(100) NOT NULL,
idade INT NOT NULL,
email VARCHAR(100)
);

DESCRIBE alunos; 

INSERT INTO alunos (nome, turma, idade,email) VALUES 
('Roberta Carlas', '1º01', 15, 'essecarasoueu@gmail.com'),
('Flavio Inácio Messias da Silva', '1º02', 15, 'poLpoL@gmail.com'),
('Jair Luiz ', '1º03', 15, 'recua@gmail.com');

SELECT * FROM alunos; 