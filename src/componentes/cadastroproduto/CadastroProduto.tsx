import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroProduto = () => {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
        imagem: ''
    });

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = () => {
        axios.get('http://localhost:3000/produtos')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar produtos:', error);
            });
    };

    const handleChange = (e) => {
        setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/produtos', novoProduto)
            .then(() => {
                alert('Produto cadastrado com sucesso!');
                setNovoProduto({ nome: '', descricao: '', preco: '', estoque: '', imagem: '' });
                carregarProdutos();
            })
            .catch(error => {
                console.error('Erro ao cadastrar produto:', error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            axios.delete(`http://localhost:3000/produtos/${id}`)
                .then(() => {
                    alert('Produto excluído com sucesso!');
                    carregarProdutos();
                })
                .catch(error => {
                    console.error('Erro ao excluir produto:', error);
                });
        }
    };

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" value={novoProduto.nome} onChange={handleChange} placeholder="Nome" required />
                <input type="text" name="descricao" value={novoProduto.descricao} onChange={handleChange} placeholder="Descrição" required />
                <input type="number" name="preco" value={novoProduto.preco} onChange={handleChange} placeholder="Preço" required />
                <input type="number" name="estoque" value={novoProduto.estoque} onChange={handleChange} placeholder="Estoque" required />
                <input type="text" name="imagem" value={novoProduto.imagem} onChange={handleChange} placeholder="URL da Imagem" required />
                <button type="submit">Cadastrar Produto</button>
            </form>

            <h2>Lista de Produtos</h2>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <strong>{produto.nome}</strong> - R$ {produto.preco}
                        <button onClick={() => handleDelete(produto.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CadastroProduto;
