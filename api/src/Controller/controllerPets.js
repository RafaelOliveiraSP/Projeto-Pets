import { Router } from "express";
import { AlterarPet, CadastrarPet, ConsultarPets, deletarPet } from "../Repository/repositoryPets.js";
import { listarSexos } from "../Repository/repositorySexos.js";


const endpoints = Router();

/* Cadastra Pet*/

endpoints.post('/cadastrarPet', async (req, resp) => {

    try{
      let Pet = req.body;
  
        if(!Pet.nome)
          throw new Error('Informe o nome de seu pet!');
  
        if(!Pet.especie)
          throw new Error('Informe a especie de seu pet!')  
  
        if(!Pet.raca)
          throw new Error('Informe a raça de seu pet!')
  
        if(!Pet.sexo)
          throw new Error('Selecione o sexo de seu pet!'); 
  
        if(!Pet.cor)
          throw new Error('Informe a cor de seu pet!'); 
  
        if(!Pet.peso || isNaN(Pet.peso))
          throw new Error('O peso deve ser um número');
  
        if(!Pet.nascimento)
          throw new Error('Informe a data de nascimento de seu pet!');
  
        if(!Pet.idade || isNaN(Pet.idade))
          throw new Error('A idade precisa ser um número!');
  
        if(!Pet.caracteristica)
          throw new Error('As características de seu pet são essenciais, informe-as :)');
  
          let r = await CadastrarPet(Pet)
          resp.send(r);
    }
    catch (err) {
        resp.status(500).send({ erro: err.message });
    }
})

/* Consulta todos os Pets cadastrados */

endpoints.get('/Pets', async (req,resp) => {
  let r = await ConsultarPets()
  resp.send(r);
})




/* Altera Pet*/

endpoints.put('/Pets/:id', async (req, resp) => {
  try {
    let Pet = req.body;
    let id = req.params.id;

    if(!Pet.nome)
    throw new Error('Informe o nome de seu pet!');

    if(!Pet.especie)
      throw new Error('Informe a especie de seu pet!')  

    if(!Pet.raca)
      throw new Error('Informe a raça de seu pet!')

    if(!Pet.sexo)
      throw new Error('Selecione o sexo de seu pet!'); 

    if(!Pet.cor)
      throw new Error('Informe a cor de seu pet!'); 

    if(!Pet.peso || isNaN(Pet.peso))
      throw new Error('O peso deve ser um número');

    if(!Pet.nascimento)
      throw new Error('Informe a data de nascimento de seu pet!');

    if(!Pet.idade || isNaN(Pet.idade))
      throw new Error('A idade precisa ser um número!');

    if(!Pet.caracteristica)
      throw new Error('As características de seu pet são essenciais, informe-as :)');


    let r = await AlterarPet(id, Pet);
    resp.send();
  }
  catch (err) {
    resp.status(500).send({ erro: err.message });
  } 
})


/* Deleta um pet da lista de cadastro*/

endpoints.delete('/Pets/:id', async (req, resp) => {
  try {
    let id = req.params.id;
    let r = await deletarPet(id);
    if (r == 0)
      throw new Error('Não existe nenhum pet com esse número!');

    resp.send();
  }
  catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});

// /* Listar sexos */

endpoints.get('/Pets/sexos', async (req, resp) => {
  let r = await listarSexos();
  resp.send(r);
});


export default endpoints;