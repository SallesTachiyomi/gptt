import { expect , test , beforeAll , afterAll } from 'vitest'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import InserirUsuario from './inserir-usuario'
import ListaUsuarios from './lista-usuario'
beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
})
afterAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
})
test("Deve inserir um usuário no banco de dados",async()=>{
    const usuarioParaInserir = {
        id:1337,
        nome:"pkz1n",
        idade:18,
        cpf:"0000000000",
        rg:"8234572893567891",
        endereco:"casa da mae joana",
        estado_civil:"é o complis"
    }
    const inserirUsuario = new InserirUsuario()
    const usuarioBanco = await inserirUsuario.execute(usuarioParaInserir)
    expect(usuarioBanco).toStrictEqual(usuarioParaInserir)
    const listaUsuarios = new ListaUsuarios()
    const usuarios = await listaUsuarios.execute()
    expect(usuarios).toContainEqual(usuarioParaInserir)

})