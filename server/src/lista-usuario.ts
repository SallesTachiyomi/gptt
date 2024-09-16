import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import 'dotenv/config';

type Output = {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: string
}

interface UsuarioRowDataPacket extends RowDataPacket {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: string
}

class ListaUsuarios {
    async execute(): Promise<Output[]> {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USUARIO,
                database: process.env.DB_BANCO,
                password: process.env.DB_PASSWORD // Inclua a senha se necessário
            });

            const [rows] = await connection.query("SELECT * FROM usuarios");
            const dados = rows as UsuarioRowDataPacket[];

            // Defina os valores válidos de acordo com o ENUM no banco de dados
            const valoresValidos = ['casado', 'solteiro'];
            
            // Filtrar usuários com estado_civil válido
            const usuariosDoBanco: Output[] = dados
                .filter(linha => valoresValidos.includes(linha.estado_civil))
                .map(linha => ({
                    id: linha.id,
                    nome: linha.nome,
                    idade: linha.idade,
                    cpf: linha.cpf,
                    rg: linha.rg,
                    endereco: linha.endereco,
                    estado_civil: linha.estado_civil
                }));

            return usuariosDoBanco;
        } catch (e: any) {
            if (e.code === 'ER_NO_SUCH_TABLE') {
                console.log("A tabela usuarios não foi criada. Crie a tabela no workbench! :D");
            } else if (e.code === "ER_PARSE_ERROR") {
                console.log("Sua query está com algo errado:");
                console.log("Verifique: vírgulas, pontos e nome de colunas.");
            } else if (e.code === 'ECONNREFUSED') {
                console.log("LIGAR O LARAGON!! MANÉ!");
            } else if (e.code === 'ER_BAD_DB_ERROR') {
                console.log("Deve criar o banco de DADOS {test}");
            } else {
                console.log("Erro ao conectar no banco", e);
            }
            throw e; // Re-lançar o erro após o log
        }
    }
}

export default ListaUsuarios;
