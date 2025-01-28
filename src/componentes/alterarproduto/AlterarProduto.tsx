// AlterarProduto.tsx (Adaptado para Front-End Obras)
import { useParams } from "react-router-dom";
import {FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Certifique-se de que o serviço API está configurado

function AlterarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            await api.put(`/produtos/${id}`, {
                nome,
                descricao,
                preco,
                imagem,
            });
            alert("Produto alterado com sucesso!");
            navigate("/");
        } catch (erro) {
            console.error("Erro ao alterar produto:", erro);
        }
    }

    return (
        <div>
            <h1>Alterar Produto</h1>
            <form onSubmit={handleForm}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL da Imagem"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default AlterarProduto;

// Função de Deletar Produto (pode ser integrada em outro componente, como uma lista de produtos)
export async function deletarProduto(id: string) {
    try {
        await api.delete(`/produtos/${id}`);
        alert("Produto deletado com sucesso!");
    } catch (erro) {
        console.error("Erro ao deletar produto:", erro);
    }
}
