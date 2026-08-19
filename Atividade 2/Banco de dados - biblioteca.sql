CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE livros(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo  VARCHAR(100) NOT NULL,
    autor  VARCHAR(100) NOT NULL
    
);

SELECT * FROM livros;
