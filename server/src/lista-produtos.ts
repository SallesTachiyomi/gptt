import mysql, { RowDataPacket } from 'mysql2/promise';
import 'dotenv/config'
type Output = {
    id:number,
    nome:string,
    descricao:string,
    preco:number,
    imagem:string
}

interface ProdutoRowDataPacket extends RowDataPacket{
    id:number,
    nome:string,
    descricao:string,
    preco:string,
    imagem:string
}

class ListaProdutos{
    async execute(){
        try{
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USUARIO,
                database: process.env.DB_BANCO,
            });
            const [rows, filds] = await connection.query("SELECT * from produtos");
            const dados = rows as ProdutoRowDataPacket[]
            const produtosDoBanco:Output[] = []
            for( let linha of dados){
                const {id,nome,descricao,preco,imagem} = {...linha}
                const produto = {
                    id,
                    nome,
                    descricao,
                    preco:parseFloat(preco),
                    imagem
                }
                produtosDoBanco.push(produto)
            }
            return produtosDoBanco
        }
        catch(e:any){
            if(e.code === 'ER_NO_SUCH_TABLE'){
                console.log("A tabela produtos não foi criada, "
                +"Crie a tabela no workbench! :D");
            }else if(e.code==="ER_PARSE_ERROR"){
                console.log("Sua query está com algo errado:")
                console.log("Verifique: virgulas, pontos e nome de colunas.")
            }
            else if(e.code === 'ECONNREFUSED'){
                console.log("LIGAR O LARAGON!! MANÉ!");
            }else if(e.code === 'ER_BAD_DB_ERROR'){
                console.log("Deve criar o banco de DADOS {test}");
            }
            else{
                console.log("Erro ao conectar no banco",e);
            }
        }    
    }
}
export default ListaProdutos