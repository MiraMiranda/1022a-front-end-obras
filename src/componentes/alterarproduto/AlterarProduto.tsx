import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlterarProduto = ({ produtoId, onProdutoAtualizado }) => {
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
        imagem: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/produtos/${produtoId}`)
            .then(response => {
                setProduto(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produto:', error);
            });
    }, [produtoId]);

    const handleChange = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/produtos/${produtoId}`, produto)
            .then(response => {
                alert('Produto atualizado com sucesso!');
                onProdutoAtualizado();
            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error);
            });
    };

    return (
        <div>
            <h2>Alterar Produto</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" value={produto.nome} onChange={handleChange} placeholder="Nome" required />
                <input type="text" name="descricao" value={produto.descricao} onChange={handleChange} placeholder="Descrição" required />
                <input type="number" name="preco" value={produto.preco} onChange={handleChange} placeholder="Preço" required />
                <input type="number" name="estoque" value={produto.estoque} onChange={handleChange} placeholder="Estoque" required />
                <input type="text" name="imagem" value={produto.imagem} onChange={handleChange} placeholder="URL da Imagem" required />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default AlterarProduto;
