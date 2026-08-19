CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE produtos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
    
);

SELECT * FROM produtos;
