import {test,expect,describe,beforeAll} from 'vitest'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import ListaUsuarios from './lista-usuario'
beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
    await connection.query("insert into usuarios values(?,?,?,?,?,?,?)",
        ['1337','pkz1n','18','0000000000','8234572893567891','casa da mae joana','é o complis'])
})
test("Deve listar os usuarios do banco de dados",async()=>{
    //GIVEN   -> dado alguma coisa
    const usuarioPreCadastrado = [{
        id:1337,
        nome:"pkz1n",
        idade:18,
        cpf:"0000000000",
        rg:"8234572893567891",
        endereco:"casa da mae joana",
        estado_civil:"é o complis"
    }]
    const listaUsuarios = new ListaUsuarios()
    //WHEN    -> Quando eu fizer algo
    const usuarios = await listaUsuarios.execute()
    //THEN    -> Eu espero que aconteça;
    expect(usuarios).toEqual(usuarioPreCadastrado)
});