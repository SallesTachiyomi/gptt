import { expect , test , beforeAll , afterAll } from 'vitest'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import ListaProdutos from './lista-produtos';
import InserirProdutos from './inserir-produtos'
beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM produtos");
})
afterAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM produtos");
})
test("Deve inserir um produto no banco de dados",async()=>{

    const produtoParaInserir = {
        id:2,
        nome:"Samsung",
        descricao:"Celular da Samsung",
        preco: 2000,
        imagem: "SEM IMAGEM"
    }

    const inserirProdutos = new InserirProdutos()
    const produtoBanco = await inserirProdutos.execute(produtoParaInserir)

    expect(produtoBanco).toStrictEqual(produtoParaInserir)
    const listaProdutos = new ListaProdutos()
    const produtos = await listaProdutos.execute()
    expect(produtos).toContainEqual(produtoParaInserir)

})