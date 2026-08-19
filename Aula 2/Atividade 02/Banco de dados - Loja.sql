CREATE DATABASE loja;

USE loja;

CREATE TABLE vendas(
	id INT PRIMARY KEY AUTO_INCREMENT,
    produto  VARCHAR(100) NOT NULL,
    quantidade  INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

SELECT * FROM vendas;
