import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionado useNavigate para redirecionamento
import './App.css';
import { useAuth } from './context/AuthContext';

type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const { user, token, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Usando o hook para navegação programática

  // useEffect para carregar produtos
  useEffect(() => {
    fetch("https://one022a-marketplace-9o8f.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados));
  }, []);

  // Se o usuário estiver logado, navega para a home
  useEffect(() => {
    if (token && user) {
      navigate('/'); // Redireciona para a home se o usuário estiver logado
    }
  }, [token, user, navigate]); // O redirecionamento acontece toda vez que o token ou o user mudarem

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false); // Fecha o dropdown ao sair
  };

  if (token && !user) {
    return <div>Carregando...</div>; // Mostrar algo enquanto os dados do usuário são carregados
  }

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          {token && user ? (
            <div className="user-menu">
              <img
                src="https://via.placeholder.com/40" // Ícone de usuário
                alt="Usuário"
                className="user-icon"
                onClick={toggleDropdown}
              />
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <p className="user-name">{user.nome}</p>
                  <Link to="/perfil" className="dropdown-item">Perfil</Link>
                  <button onClick={handleLogout} className="dropdown-item logout-button">
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
              <Link to="/cadastro">
                <button className="cadastro-button">Cadastro</button>
              </Link>
            </>
          )}
        </div>
      </header>

      <div className="produtos-container">
        <h1 className='titulo-produto'>Produtos</h1>
        <div className="produtos-list">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className='container-imagem'>
                <img src={produto.imagem} alt="Imagem do produto" />
              </div>
              <p className="produto-preco">{produto.preco}</p>
              <p className="produto-descricao">{produto.descricao}</p>
              <button className="botao-comprar">Comprar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
