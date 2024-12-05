import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
    const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login(codigoEmpresarial, senha); // Chama a função de login
            alert('Login bem-sucedido!');
            // Redirecionamento ou outra ação após login
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login!');
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
