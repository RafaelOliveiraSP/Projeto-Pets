create database pets_db;

use pets_db;

create table tb_pet (
id_pet					INT PRIMARY KEY AUTO_INCREMENT,
nm_nome					VARCHAR(200) NOT NULL,
ds_especie				VARCHAR(200) NOT NULL,
ds_raca					VARCHAR(200) NOT NULL,
id_sexo					INT			 NOT NULL,
ds_cor					VARCHAR(200) NOT NULL,
vl_peso					DECIMAL(3,2) NOT NULL,
dt_nascimento			DATE   		 NOT NULL,
nr_idade				VARCHAR(200) NOT NULL,
ds_caracteristicas  	VARCHAR(200) NOT NULL,
foreign key (id_sexo) 	REFERENCES tb_sexo (id_sexo)
);

create table tb_sexo (
id_sexo					INT PRIMARY KEY AUTO_INCREMENT,
ds_sexo					VARCHAR(200) NOT NULL
);

insert into tb_sexo (ds_sexo)
			  values('Macho'),('Fêmea');
              
select * from tb_sexo;

SELECT * FROM tb_pet;