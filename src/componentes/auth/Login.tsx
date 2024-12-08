import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Usar o hook useNavigate para redirecionamento

const Login: React.FC = () => {
    const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Inicializa o hook de navegação

    const handleLogin = async () => {
        try {
            await login(codigoEmpresarial, senha); // Chama a função de login
            alert('Login bem-sucedido!');
            // Redireciona para a home page após login
            navigate('/'); // Alterado para redirecionar para a home page (rota '/')
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login! Verifique suas credenciais.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
