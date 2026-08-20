CREATE DATABASE escola;

USE escola;

CREATE TABLE professores(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    disciplina VARCHAR(100) NOT NULL
);

SELECT * FROM professores;

CREATE TABLE disciplinas(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    professor VARCHAR(100) NOT NULL,
    aulas_semanais  INT NOT NULL
);

SELECT * FROM disciplinas;

