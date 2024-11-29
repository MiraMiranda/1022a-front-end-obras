import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Usando Link para navegação entre páginas
import './App.css';

// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  // useEffect para carregar produtos e usuários
  useEffect(() => {
    // Buscar os produtos
    fetch("https://one022a-marketplace-9o8f.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados));

    // Buscar os usuários (não implementado no exemplo, mas pode ser futuramente)
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li> {/* Home */}
            <li><Link to="/produtos">Produtos</Link></li> {/* Produtos */}
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          {/* Link de Login */}
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>

          {/* Link de Cadastro */}
          <Link to="/cadastro">
            <button className="cadastro-button">Cadastro</button>
          </Link>
        </div>
      </header>

      {/* Listagem de Produtos */}
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
