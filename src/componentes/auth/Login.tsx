import { useState } from 'react';
import api from '../../api/api'; // Certifique-se de que o arquivo api.ts está configurado
import { useNavigate } from 'react-router-dom'; // Para navegação após login

export default function Login() {
  const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuarios/login', {
        codigoEmpresarial,
        senha,
      });

      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.token);
      alert('Login realizado com sucesso!');
      navigate('/dashboard'); // Redirecionar para a página de dashboard
    } catch (error: any) {
      alert(
        `Erro ao realizar login: ${
          error.response?.data?.mensagem || 'Erro desconhecido'
        }`
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
