import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Perfil: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Recuperar os dados do usuário do localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null; // Verifique se existe antes de acessar

    // Se o usuário não estiver logado, redirecionar para a tela de login
    if (!user) {
        navigate('/login');
        return null; // Retorna null enquanto redireciona
    }

    const handleLogout = () => {
        logout(); // Realiza o logout
        localStorage.removeItem('user'); // Limpa o localStorage
        navigate('/login'); // Redireciona para a tela de login
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Perfil do Usuário</h1>
            <div style={{ marginBottom: '20px' }}>
                <img
                    src="https://via.placeholder.com/100" // Placeholder para o ícone do usuário
                    alt="Usuário"
                    style={{ borderRadius: '50%', marginBottom: '10px' }}
                />
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Código Empresarial:</strong> {user.codigoEmpresarial}</p>
            </div>
            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: '#ff4d4d',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Sair da Conta
            </button>
        </div>
    );
};

export default Perfil;
