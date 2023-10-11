import conexao from "../connection.js";

export async function listarSexos() {
    let comando = `
        select id_sexo	      id,
                ds_sexo       opcao
          from tb_sexo`;
    
    let [dados] = await conexao.query(comando);
    return dados;
  }