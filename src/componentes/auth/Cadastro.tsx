import React, { useState } from 'react';
import './Auth.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const dadosCadastro = { nome, cpf, codigoEmpresarial, senha };

        try {
            const resposta = await fetch('https://one022a-marketplace-9o8f.onrender.com/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCadastro),
            });

            if (!resposta.ok) {
                throw new Error('Erro no cadastro');
            }

            const data = await resposta.json();
            console.log(data);
            alert('Cadastro realizado com sucesso!');
        } catch (erro) {
            console.error(erro);
            alert('Erro ao cadastrar usuário.');
        }
    };

    return (
        <form className="cadastro-container" onSubmit={handleSubmit}>
            <h1 className="cadastro-title">Cadastro</h1>
            <div className="cadastro-form-group">
                <label className="cadastro-label">Nome:</label>
                <input
                    className="cadastro-input"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="cadastro-form-group">
                <label className="cadastro-label">CPF:</label>
                <input
                    className="cadastro-input"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
            </div>
            <div className="cadastro-form-group">
                <label className="cadastro-label">Código Empresarial:</label>
                <input
                    className="cadastro-input"
                    type="text"
                    value={codigoEmpresarial}
                    onChange={(e) => setCodigoEmpresarial(e.target.value)}
                    required
                />
            </div>
            <div className="cadastro-form-group">
                <label className="cadastro-label">Senha:</label>
                <input
                    className="cadastro-input"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>
            <button className="cadastro-button" type="submit">
                Cadastrar
            </button>
        </form>
    );
};

export default Cadastro;
