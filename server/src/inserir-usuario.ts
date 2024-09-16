import mysql from 'mysql2/promise';
import 'dotenv/config';

type Input = {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: string
}

type Output = {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: string
}

export default class InserirUsuario {
    async execute(input: Input): Promise<Output> {
        try {
            // Defina os valores válidos de acordo com o ENUM no banco de dados
            const valoresValidos = ['Casado', 'Solteiro'];

            if (!valoresValidos.includes(input.estado_civil)) {
                throw new Error('Estado civil inválido');
            }

            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USUARIO,
                database: process.env.DB_BANCO,
                password: process.env.DB_PASSWORD  // Inclua a senha se necessário
            });

            await connection.query(
                "INSERT INTO usuarios (id, nome, idade, cpf, rg, endereco, estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [input.id, input.nome, input.idade, input.cpf, input.rg, input.endereco, input.estado_civil]
            );

            return input;
        } catch (e: any) {
            console.log(e.code);
            throw new Error(e.message);
        }
    }
}
