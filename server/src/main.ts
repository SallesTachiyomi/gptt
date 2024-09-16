import Express from "express";
import Cors from 'cors';
import ListaProdutos from "./lista-produtos";
import InserirProdutos from "./inserir-produtos";
import ListaUsuarios from "./lista-usuario";
import InserirUsuario from "./inserir-usuario";

const app = Express();
app.use(Cors());
app.use(Express.json());

app.get("/produtos", async (req, res) => {
    try {
        const listaProdutos = new ListaProdutos();
        const produtos = await listaProdutos.execute();
        res.send(produtos);
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao listar produtos");
    }
});

app.post("/produtos", async (req, res) => {
    console.log("Alguém tentou cadastrar Produtos");
    const { id, nome, descricao, preco, imagem } = req.body;
    const produto = { id, nome, descricao, preco, imagem };
    const inserirProduto = new InserirProdutos();
    try {
        const produtoInserido = await inserirProduto.execute(produto);
        res.status(201).send(produtoInserido);
    } catch (e: any) {
        console.error(e);
        if (e.message === "ER_DUP_ENTRY") {
            res.status(409).send("Produto já cadastrado");
        } else {
            res.status(409).send("Erro Desconhecido: Olhe o TERMINAL DO VSCode");
        }
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const listaUsuarios = new ListaUsuarios();
        const usuarios = await listaUsuarios.execute();
        res.send(usuarios);
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao listar usuários");
    }
});

app.post("/usuarios", async (req, res) => {
    console.log("Alguém tentou cadastrar Usuários");
    const { id, nome, idade, cpf, rg, endereco, estado_civil } = req.body;
    const usuario = { id, nome, idade, cpf, rg, endereco, estado_civil };
    const inserirUsuario = new InserirUsuario();
    try {
        const usuarioInserido = await inserirUsuario.execute(usuario);
        res.status(201).send(usuarioInserido);
    } catch (e: any) {
        console.error(e);
        if (e.message === "ER_DUP_ENTRY") {
            res.status(409).send("Usuário já cadastrado");
        } else {
            res.status(409).send("Erro Desconhecido: Olhe o TERMINAL DO VSCode");
        }
    }
});

const porta = 8000;
app.listen(porta, () => {
    console.log(`Server Rodando na porta ${porta}`);
    console.log("Digite: localhost:8000/produtos na URL para acessar o servidor.");
    console.log("Digite: localhost:8000/usuarios na URL para acessar o servidor.");
});
