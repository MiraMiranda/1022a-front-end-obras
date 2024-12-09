import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ProdutoRegistro.css"; // Importando o CSS

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
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Você não está autenticado. Faça login para continuar.");
                return;
            }

            const resposta = await fetch(
                "https://one022a-marketplace-9o8f.onrender.com/produtos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: produtoId,
                        nome: produtoNome,
                        descricao: produtoDescricao,
                        preco: produtoPreco,
                        imagem: produtoImagem,
                        estoque: produtoEstoque,
                    }),
                }
            );

            if (resposta.ok) {
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

    // Atualizando os campos do formulário
    const atualizarCampo = (campo: React.Dispatch<React.SetStateAction<string>>) => (evento: React.ChangeEvent<HTMLInputElement>) => {
        campo(evento.target.value);
    };

    return (
        <div className="produto-container">
            <h1 className="produto-title">Cadastro de Produtos</h1>
            <form onSubmit={submeterFormulario}>
                <input
                    className="produto-input"
                    placeholder="ID do Produto"
                    type="text"
                    value={produtoId}
                    onChange={atualizarCampo(alterarProdutoId)}
                />
                <input
                    className="produto-input"
                    placeholder="Nome do Produto"
                    type="text"
                    value={produtoNome}
                    onChange={atualizarCampo(alterarProdutoNome)}
                />
                <input
                    className="produto-input"
                    placeholder="Descrição"
                    type="text"
                    value={produtoDescricao}
                    onChange={atualizarCampo(alterarProdutoDescricao)}
                />
                <input
                    className="produto-input"
                    placeholder="Preço"
                    type="text"
                    value={produtoPreco}
                    onChange={atualizarCampo(alterarProdutoPreco)}
                />
                <input
                    className="produto-input"
                    placeholder="URL da Imagem"
                    type="text"
                    value={produtoImagem}
                    onChange={atualizarCampo(alterarProdutoImagem)}
                />
                <input
                    className="produto-input"
                    placeholder="Estoque"
                    type="text"
                    value={produtoEstoque}
                    onChange={atualizarCampo(alterarProdutoEstoque)}
                />
                <button className="produto-button" type="submit">
                    Cadastrar Produto
                </button>
            </form>
        </div>
    );
}

export default ProdutoRegistro;
