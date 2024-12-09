import { useEffect, useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';  // Importando Routes e Route
import './App.css';
import { useAuth } from './context/AuthContext';
import Perfil from './componentes/Perfil';  // Importe o componente de Perfil

type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  estoque: number;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const { user, token, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // useEffect para carregar produtos
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("https://one022a-marketplace-9o8f.onrender.com/produtos");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  // Redirecionar se o usuário estiver logado
  useEffect(() => {
    if (token && user) {
      navigate('/');
    }
  }, [token, user, navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  if (token && !user) {
    return <div>Aguarde, carregando...</div>;
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
                src="https://via.placeholder.com/40"
                alt="Usuário"
                className="user-icon"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <p className="user-name">{user.nome}</p>
                  <Link to="/perfil" className="dropdown-item">Perfil</Link>  {/* Link para o Perfil */}
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

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/produtos" element={<div>Produtos</div>} />
        <Route path="/sobre" element={<div>Sobre</div>} />
        <Route path="/contato" element={<div>Contato</div>} />
        <Route path="/perfil" element={<Perfil />} />  {/* A rota para o perfil */}
      </Routes>

      <div className="produtos-container">
        <h1 className="titulo-produto">Produtos</h1>
        <div className="produtos-list">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className="container-imagem">
                <img src={produto.imagem} alt={`Imagem de ${produto.nome}`} />
              </div>
              <p className="produto-preco">Preço: {produto.preco}</p>
              <p className="produto-descricao">{produto.descricao}</p>
              <p className="produto-estoque">
                Estoque: {produto.estoque > 0 ? produto.estoque : 'Indisponível'}
              </p>
              <button
                className="botao-comprar"
                onClick={() => alert(`Comprou ${produto.nome}`)}
                disabled={produto.estoque === 0}
              >
                {produto.estoque > 0 ? 'Comprar' : 'Esgotado'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
