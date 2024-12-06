// src/components/Cadastro.tsx

import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>CPF:</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Código Empresarial:</label>
                <input
                    type="text"
                    value={codigoEmpresarial}
                    onChange={(e) => setCodigoEmpresarial(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default Cadastro;
