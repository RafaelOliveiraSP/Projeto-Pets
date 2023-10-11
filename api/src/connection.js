import mysql from 'mysql2/promise';

const conexao = await mysql.createConnection({
    host:       process.env.HOST,
    database:   process.env.DATABASE,
    user:       process.env.USER,
    password:   process.env.PASSWORD
})


console.log('Banco de Dados conectado!');
export default conexao;