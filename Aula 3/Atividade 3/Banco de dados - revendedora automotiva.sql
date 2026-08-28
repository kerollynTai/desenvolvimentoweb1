CREATE DATABASE revendedora_automotiva;

USE revendedora_automotiva;

CREATE TABLE veiculos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    modelo VARCHAR(100), 
    placa VARCHAR(20) 
);