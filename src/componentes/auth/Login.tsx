import { useState } from 'react';

export default function Login() {
  const [codigoEmpresarial, setCodigoEmpresarial] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação (pode ser integrada com backend)
    console.log(codigoEmpresarial, senha);
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
