import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Cadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
    const [senha, setSenha] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const { cadastrar } = useAuth();

    const handleCadastro = async () => {
        try {
            await cadastrar(nome, cpf, codigoEmpresarial, senha, imagem); // Chama a função de cadastro
            alert('Cadastro bem-sucedido!');
        } catch (error) {
            console.error('Erro ao tentar cadastrar:', error);
            alert('Erro ao tentar cadastrar!');
        }
    };

    return (
        <div>
            <h1>Cadastro</h1>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />
            <input
                type="text"
                placeholder="Código Empresarial"
                value={codigoEmpresarial}
                onChange={(e) => setCodigoEmpresarial(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImagem(e.target.files ? e.target.files[0] : null)}
            />
            <button onClick={handleCadastro}>Cadastrar</button>
        </div>
    );
};

export default Cadastro;
