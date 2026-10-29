CREATE DATABASE crud_produtos;

USE crud;

CREATE TABLE produtos(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
quantidade INT NOT NULL,
preco DECIMAL(10,2)
);

DESCRIBE produtos; 

INSERT INTO produtos (nome, quantidade, preco) VALUES 
('Arroz Integral 5kg', 50, 24.90),
('Feijão Carioca 1kg', 80, 7.50),
('Leite Integral 1L', 120, 4.89);

SELECT * FROM produtos;