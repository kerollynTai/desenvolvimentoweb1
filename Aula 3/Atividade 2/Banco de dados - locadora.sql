CREATE DATABASE locadora;

USE locadora;

CREATE TABLE filmes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo  VARCHAR(100) NOT NULL,
    ano  INT NOT NULL
    
);

SELECT * FROM filmes;