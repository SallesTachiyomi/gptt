drop database if exists test;
create database if not exists test;
use test;
create table produtos(
	id BIGINT primary key auto_increment,
    nome VARCHAR(50),
    descricao VARCHAR(50),
    preco DECIMAL(10,2),
    imagem VARCHAR(300)
);

insert into produtos values(1,"Iphone","Celular Ruim",4000.50,"https://s2-techtudo.glbimg.com/fQiJ0IoTPyS7kOji53qOHDP_VWM=/0x0:4000x2664/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/J/F/1YRriISlAbBwU7zUr7wQ/marca-d-aguadd.png")


CREATE TABLE IF NOT EXISTS usuarios(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    idade INT,
    cpf VARCHAR(50),
    rg VARCHAR(50),
    endereco VARCHAR(100),
    estado_civil ENUM("solteiro","casado")
);

INSERT INTO usuarios VALUES (1,"João",18,"036.547.382-10","002.874.325","Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS","casado");



