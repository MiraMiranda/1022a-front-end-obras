// src/componentes/auth/DeleteUser.tsx
import { useState } from 'react';
import api from '../../api/api'; // Importe a instância do axios
import { useNavigate } from 'react-router-dom'; // Para navegação

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await api.delete('/usuarios/deletar');
      alert('Usuário excluído com sucesso!');
      navigate('/login'); // Redireciona o usuário para a página de login após excluir
    } catch (error: any) {
      alert(`Erro ao excluir usuário: ${error.response?.data?.mensagem || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Excluir Conta</h2>
      <button onClick={handleDeleteUser} disabled={loading}>
        {loading ? 'Excluindo...' : 'Excluir Conta'}
      </button>
    </div>
  );
};

export default DeleteUser;
