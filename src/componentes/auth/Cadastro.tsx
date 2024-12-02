import { useState } from 'react';
import api from '../../api/api'; // Certifique-se de que o arquivo api.ts está configurado

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('codigoEmpresarial', codigoEmpresarial);
    formData.append('senha', senha);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const response = await api.post('/usuarios/cadastro', formData);
      alert('Cadastro realizado com sucesso!');
      console.log('Resposta do servidor:', response.data);
    } catch (error: any) {
      alert(
        `Erro ao realizar cadastro: ${
          error.response?.data?.mensagem || 'Erro desconhecido'
        }`
      );
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome Completo"
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
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
