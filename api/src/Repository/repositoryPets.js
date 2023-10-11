import conexao from "../connection.js";

/* Cadastra Pet*/

export async function CadastrarPet(Pet){
    let comando =`
    insert into tb_pet(
                nm_nome, 
                ds_especie, 
                ds_raca, 
                id_sexo, 
                ds_cor, 
                vl_peso, 
                dt_nascimento, 
                nr_idade, 
                ds_caracteristicas) 
            values ( ?, ?, ?, ?, ?, ?, ?, ?, ? )
    `

    let [resp] = await conexao.query(comando,
    [
        Pet.nome,
        Pet.especie,
        Pet.raca,
        Pet.sexo,
        Pet.cor,
        Pet.peso,
        Pet.nascimento,
        Pet.idade,
        Pet.caracteristica
    ])

    Pet.id = resp.insertId;
    return Pet;  
}

/* Consulta todos os Pets cadastrados */

export async function ConsultarPets(){
    let comando = `
        Select  tbp.id_pet              as  Pet,
                tbp.nm_nome             as  Nome, 
                tbp.ds_especie          as  Especie, 
                tbp.ds_raca             as  Raca, 
                tbs.id_sexo             as  IdSexo,
                tbs.ds_sexo             as  Sexo, 
                tbp.ds_cor              as  Cor , 
                tbp.vl_peso             as  Peso , 
                tbp.dt_nascimento       as  Nascimento, 
                tbp.nr_idade            as  Idade, 
                tbp.ds_caracteristicas  as  Caracteristicas
            from       tb_pet           as  tbp
            inner join tb_sexo	        as  tbs on tbs.id_sexo = tbp.id_sexo
            order by id_pet 
    `

    let [dados] = await  conexao.query(comando)
    return dados;
}


/* Altera Pet*/

export async function AlterarPet(id, Pet){
    let comando =`
    update tb_pet set   nm_nome            = ?, 
                        ds_especie         = ?, 
                        ds_raca            = ?, 
                        id_sexo            = ?, 
                        ds_cor             = ?, 
                        vl_peso            = ?, 
                        dt_nascimento      = ?, 
                        nr_idade           = ?, 
                        ds_caracteristicas = ? 
                where   id_pet             = ? 
    `

    let [resp] = await conexao.query(comando,
    [
        Pet.nome,
        Pet.especie,
        Pet.raca,
        Pet.sexo,
        Pet.cor,
        Pet.peso,
        Pet.nascimento,
        Pet.idade,
        Pet.caracteristica,
        id
    ])

    return resp.affectedRows;
}

/* Deleta um pet da lista de cadastro*/

export async function deletarPet(id) {
    let comando = `
        delete from tb_pet 
              where id_pet = ?
    `
  
    let [resp] = await conexao.query(comando, [id]);
    return resp.affectedRows;
  }