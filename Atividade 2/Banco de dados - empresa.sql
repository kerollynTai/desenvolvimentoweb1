CREATE DATABASE empresa;

USE empresa;

CREATE TABLE clientes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    telefone  VARCHAR(11) NOT NULL
    
);

SELECT * FROM clientes;

CREATE TABLE funcionarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    cargo  VARCHAR(11) NOT NULL,
    salario DECIMAL(10,2) NOT NULL
    
);

SELECT * FROM funcionarios;
