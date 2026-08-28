use escola;

CREATE TABLE cursos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100), 
    carga_horaria INT 
); 

CREATE TABLE eventos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100), 
    data_evento DATE 
); 
 

 