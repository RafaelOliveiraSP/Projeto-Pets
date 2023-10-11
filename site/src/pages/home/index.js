import './index.scss';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function HomePage() {

  const [idPet, setIdPet]                       = useState(0);
  const [nome, setNome]                         = useState('');
  const [especie, setEspecie]                   = useState('');
  const [raca, setRaca]                         = useState('');

  const [opcoesSexo, setOpcoesSexo]             = useState([]);
  const [sexo, setSexo]                         = useState(0);

  const [cor, setCor]                           = useState('');
  const [peso, setPeso]                         = useState('');
  const [nascimento, setNascimento]             = useState('');
  const [idade, setIdade]                       = useState('');
  const [caracteristica, setCaracteristica]     = useState('');

  const [listaPets, setlistaPets]               = useState([]);


  async function salvar() {
    try {
      let Pet = {
        nome: nome,
        especie: especie,
        raca: raca,
        sexo: sexo,
        cor: cor,
        peso: peso,
        nascimento: nascimento,
        idade: idade,
        caracteristica: caracteristica
      }
    
      if (idPet === 0) {
        await axios.post('http://localhost:5000/cadastrarPet', Pet);
        alert('Cliente cadastrado com sucesso!');
        limpar();
      }
      else {
        await axios.put('http://localhost:5000/Pets/' + idPet, Pet);
        alert('Pet alterado com sucesso!');
        listarPets();
        limpar();
      }
    } 
    catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  async function deletarPet(id) {
    confirmAlert({
      title: 'Deletar pet',
      message: 'Tem certeza que deseja remover esse pet da lista?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            try {
              await axios.delete('http://localhost:5000/Pets/' + id);
              alert('Pet removido com sucesso!');
              listarPets();
            }
            catch (err) {
              toast.error(err.response.data.erro);
              console.log({idPet});
            }
          }
        },
        {
          label: 'Não'
        }
      ]
    });    
  }

  function alterarPet(item){
    setNome(item.Nome)
    setEspecie(item.Especie)
    setRaca(item.Raca)
    setSexo(item.Sexo)
    setCor(item.Cor)
    setPeso(item.Peso)
    setNascimento(item.Nascimento)
    setIdade(item.Idade)
    setCaracteristica(item.Caracteristicas)
    setIdPet(item.Pet)
  }

  function limpar(){
    setNome('')
    setEspecie('')
    setRaca('')
    setSexo(0)
    setCor('')
    setPeso('')
    setNascimento('')
    setIdade('')
    setCaracteristica('')
  }

  async function listarSexos() {
    let r = await axios.get('http://localhost:5000/Pets/sexos');
    setOpcoesSexo(r.data);
  }

  async function listarPets(){
    let r = await axios.get('http://localhost:5000/Pets');
    setlistaPets(r.data)
  }

  useEffect(() => {
    //
    listarSexos();
    //
  }, [])


  return (
    <div className="pagina-principal">

      <div className='cabecalho'>
        <img src='./assets/img/pngaaa2.png' alt='patinha' />
         <h1> Cadastre um novo pet</h1>
        <img src='./assets/img/pngaaa2.png' alt='patinha' />
      </div>
      
      
      <div className='cartao'>
          <div className='formulario-cadastro'>
                <span> Nome:* </span>
                <input type='text' value={nome} onChange={e => setNome(e.target.value)} placeholder='Ex: Jack'/>

                <span> Espécie:* </span>
                <input type='text' value={especie} onChange={e => setEspecie(e.target.value)} placeholder='Ex: Gato'/>

                <span > Raça:* </span>
                <input type='text' value={raca} onChange={e => setRaca(e.target.value)} placeholder='Ex: Siamês'/>

                <span> Sexo:* </span>
                <select type='text' value={sexo} onChange={e => setSexo(e.target.value)}>
                  <option value={0}> Selecione </option>
                  {opcoesSexo.map(item =>
                    <option value={item.id}> {item.opcao} </option>  
                  )}
                </select>
            
                <span>Cor:* </span>
                <input type='text' value={cor} onChange={e => setCor(e.target.value)} placeholder='Ex: Laranja'/>
              
                <span >Peso:* </span>
                <input type='text' value={peso} onChange={e => setPeso(e.target.value)} placeholder='Ex: 3.00'/>

                <span >Nascimento:* </span>
                <input type='text' value={nascimento.substring(0, 10)} onChange={e => setNascimento(e.target.value)} placeholder='Ex: 2023-01-01'/>

                <span >Idade:* </span>
                <input type='text' value={idade} onChange={e => setIdade(e.target.value)} placeholder='Ex: 3'/>

                <span > Características:* </span>
                <input type='text' value={caracteristica} onChange={e => setCaracteristica(e.target.value)} placeholder='Ex: Bravo'/> 
          
                <button onClick={salvar}>{idPet === 0 ? 'Cadastrar': 'Alterar'}</button>
          </div>

          <div className='cartao-lista-pets'>
            <section>

              <h1>Lista dos Pets Cadastrados</h1>

              <div className='botao-listar' >
                <span>Clique na patinha para listar os pets</span>
                <i class="fa-solid fa-arrow-right" style={{color: "#ffffff",}}></i>
                <img onClick={listarPets} src='./assets/img/pngaaa2.png' alt='patinha' />
              </div>

              <div className='titulos-pets'>
                <h3>Número</h3>
                <h3 style={{width: 80 + "px"}}>Nome</h3>
                <h3>Espécie</h3>
                <h3 style={{width: 80 + "px"}}>Raça</h3>
                <h3>Sexo</h3>
                <h3 style={{width: 80 + "px"}}>Cor</h3>
                <h3>Peso</h3>
                <h3>Nascimento</h3>
                <h3>Idade</h3>
                <h3>Características</h3>
              </div>

              {listaPets.map(item =>
                <div className='tabela-pets'>
                  <span style={{width: 92.19 + "px"}}>{item.Pet}</span>
                  <span style={{width: 80 + "px"}}>{item.Nome}</span>
                  <span style={{width: 84.34 + "px"}}>{item.Especie}</span>
                  <span style={{width: 80 + "px"}}>{item.Raca}</span>
                  <span style={{width: 62.06 + "px"}}>{item.Sexo}</span>
                  <span style={{width: 80 + "px"}}>{item.Cor}</span>
                  <span style={{width: 60.73 + "px"}}>{item.Peso}</span>
                  <span style={{width: 124.61 + "px"}}>{item.Nascimento.substring(0, 10)}</span>
                  <span style={{width: 69.3 + "px"}}>{item.Idade}</span>
                  <span style={{width: 146.45 + "px"}}>{item.Caracteristicas}</span>

                  <div>
                    <i class="fa-regular fa-pen-to-square" onClick={() => alterarPet(item)}></i>
                    <i class="fa-solid fa-delete-left" onClick={() => deletarPet(item.Pet)}></i> 
                  </div>
                </div>  
              )}
            </section>
          </div>     
           
        </div>      
    </div>
)}
