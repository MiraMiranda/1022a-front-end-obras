import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // Adicionando o AuthProvider
import Login from './componentes/auth/Login.tsx';  // Componente de Login
import Cadastro from './componentes/auth/Cadastro.tsx';  // Componente de Cadastro
import CadastroProduto from './componentes/cadastroproduto/CadastroProduto.tsx';  // Cadastro de Produto
import Perfil from './componentes/Perfil';  // Importar o componente de Perfil

// Definindo as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/cadastro-produto",
    element: <CadastroProduto />,
  },
  {
    path: "/perfil",  // Definir a rota para a página de perfil
    element: <Perfil />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>  {/* Encapsulando a aplicação com AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
