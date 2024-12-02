import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Usando BrowserRouter e Routes
import { AuthProvider } from './context/AuthContext'; // Importando o AuthProvider
import App from './App.tsx';
import './index.css';
import Login from './componentes/auth/Login.tsx'; // Componente de Login
import Cadastro from './componentes/auth/Cadastro.tsx'; // Componente de Cadastro
import CadastroProduto from './componentes/cadastroproduto/CadastroProduto.tsx'; // Cadastro de Produto

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* Adicionando o BrowserRouter como wrapper */}
      <AuthProvider> {/* O AuthProvider agora está dentro do Router */}
        <Routes> {/* Usando Routes para definir as rotas */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
