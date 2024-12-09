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
            // Pegar o token do localStorage
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Você não está autenticado. Faça login para continuar.");
                return;
            }

            console.log("Dados enviados:", {
                id: produtoId,
                nome: produtoNome,
                descricao: produtoDescricao,
                preco: produtoPreco,
                imagem: produtoImagem,
                estoque: produtoEstoque,
            }); // Debug para verificar os dados enviados

            const resposta = await fetch("https://one022a-marketplace-9o8f.onrender.com/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Enviar o token no cabeçalho
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

            if (resposta.ok) {
                alert("Produto cadastrado com sucesso!");
                redirecionar("/"); // Redireciona após o cadastro
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
                        value={produtoId} // Adicionado para refletir o estado
                        onChange={atualizarId}
                    />
                </div>
                <div>
                    <input
                        placeholder="Nome do Produto"
                        type="text"
                        value={produtoNome} // Adicionado para refletir o estado
                        onChange={atualizarNome}
                    />
                </div>
                <div>
                    <input
                        placeholder="Descrição"
                        type="text"
                        value={produtoDescricao} // Adicionado para refletir o estado
                        onChange={atualizarDescricao}
                    />
                </div>
                <div>
                    <input
                        placeholder="Preço"
                        type="text"
                        value={produtoPreco} // Adicionado para refletir o estado
                        onChange={atualizarPreco}
                    />
                </div>
                <div>
                    <input
                        placeholder="URL da Imagem"
                        type="text"
                        value={produtoImagem} // Adicionado para refletir o estado
                        onChange={atualizarImagem}
                    />
                </div>
                <div>
                    <input
                        placeholder="Estoque"
                        type="text"
                        value={produtoEstoque} // Adicionado para refletir o estado
                        onChange={atualizarEstoque}
                    />
                </div>
                <button type="submit">Cadastrar Produto</button>
            </form>
        </>
    );
}

export default ProdutoRegistro;
