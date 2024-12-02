import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function ProdutoRegistro() {
    const redirecionar = useNavigate();
    const [produtoId, alterarProdutoId] = useState("");
    const [produtoNome, alterarProdutoNome] = useState("");
    const [produtoDescricao, alterarProdutoDescricao] = useState("");
    const [produtoPreco, alterarProdutoPreco] = useState("");
    const [produtoImagem, alterarProdutoImagem] = useState("");
    const [produtoEstoque, alterarProdutoEstoque] = useState("");

    async function submeterFormulario(evento: FormEvent) {
        evento.preventDefault();
        try {
            const resposta = await fetch("http://localhost:8000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: produtoId,
                    nome: produtoNome,
                    descricao: produtoDescricao,
                    preco: produtoPreco,
                    imagem: produtoImagem,
                    estoque: produtoEstoque,
                }),
            });
            if (resposta.status !== 500) {
                alert("Produto cadastrado com sucesso!");
                redirecionar("/");
            } else {
                const mensagemErro = await resposta.text();
                alert("Erro ao cadastrar produto: " + mensagemErro);
            }
        } catch (erro) {
            alert("Não foi possível conectar ao servidor.");
        }
    }

    function atualizarId(evento: ChangeEvent<HTMLInputElement>) {
        alterarProdutoId(evento.target.value);
    }

    function atualizarNome(evento: ChangeEvent<HTMLInputElement>) {
        alterarProdutoNome(evento.target.value);
    }

    function atualizarDescricao(evento: ChangeEvent<HTMLInputElement>) {
        alterarProdutoDescricao(evento.target.value);
    }

    function atualizarPreco(evento: ChangeEvent<HTMLInputElement>) {
        alterarProdutoPreco(evento.target.value);
    }

    function atualizarImagem(evento: ChangeEvent<HTMLInputElement>) {
        alterarProdutoImagem(evento.target.value);
    }

    function atualizarEstoque(evento: ChangeEvent<HTMLInputElement>) {
        alterarProdutoEstoque(evento.target.value);
    }

    return (
        <>
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={submeterFormulario}>
                <div>
                    <input
                        placeholder="ID do Produto"
                        type="text"
                        onChange={atualizarId}
                    />
                </div>
                <div>
                    <input
                        placeholder="Nome do Produto"
                        type="text"
                        onChange={atualizarNome}
                    />
                </div>
                <div>
                    <input
                        placeholder="Descrição"
                        type="text"
                        onChange={atualizarDescricao}
                    />
                </div>
                <div>
                    <input
                        placeholder="Preço"
                        type="text"
                        onChange={atualizarPreco}
                    />
                </div>
                <div>
                    <input
                        placeholder="URL da Imagem"
                        type="text"
                        onChange={atualizarImagem}
                    />
                </div>
                <div>
                    <input
                        placeholder="Estoque"
                        type="text"
                        onChange={atualizarEstoque}
                    />
                </div>
                <button type="submit">Cadastrar Produto</button>
            </form>
        </>
    );
}

export default ProdutoRegistro;
