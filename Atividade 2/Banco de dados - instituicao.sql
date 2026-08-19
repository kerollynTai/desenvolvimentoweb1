CREATE DATABASE instituicao;

USE instituicao;

CREATE TABLE cursos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    carga_horaria  INT NOT NULL
    
);

SELECT * FROM cursos;

