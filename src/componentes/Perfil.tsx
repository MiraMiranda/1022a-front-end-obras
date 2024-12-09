import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Perfil.css'; // Importar o CSS

const Perfil: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="perfil-container">
            <h1 className="perfil-title">Perfil do Usuário</h1>
            <img
                src="https://i.cbc.ca/1.2932482.1422309341!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/ryan-gosling-internet-meme.jpg"
                alt="Usuário"
                className="perfil-avatar"
            />
            <div className="perfil-info">
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Código Empresarial:</strong> {user.codigoEmpresarial}</p>
            </div>
            <button className="perfil-logout-button" onClick={handleLogout}>
                Sair da Conta
            </button>
        </div>
    );
};

export default Perfil;
