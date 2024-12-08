import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as loginService, cadastrarUsuario, getUserData } from '../services/authService';

// Definindo os tipos para o contexto de autenticação
interface AuthContextType {
    user: User | null; // Tipo ajustado para armazenar informações do usuário
    token: string | null;
    login: (codigoEmpresarial: string, senha: string) => Promise<void>;
    logout: () => void;
    cadastrar: (nome: string, cpf: string, codigoEmpresarial: string, senha: string, imagem: File | null) => Promise<void>;
}

interface User {
    nome: string; // Nome do usuário
    codigoEmpresarial: string; // Código empresarial do usuário
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token')); // Recupera o token do localStorage ao inicializar

    // Função de login
    async function login(codigoEmpresarial: string, senha: string) {
        try {
            const { token } = await loginService(codigoEmpresarial, senha); // Chama o serviço de login
            localStorage.setItem('token', token); // Armazena o token no localStorage
            setToken(token); // Define o token no estado

            // Carregar informações do usuário
            await loadUserData(token); // Chama a função para carregar os dados do usuário com o token
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw new Error('Falha no login');
        }
    }

    // Função para carregar as informações do usuário
    async function loadUserData(token: string) {
        try {
            // Supondo que você tenha um endpoint para pegar as informações do usuário
            const userData = await getUserData(token);
            setUser(userData); // Atualiza o estado do usuário com as informações recebidas
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
            throw new Error('Erro ao carregar os dados do usuário');
        }
    }

    // Função para cadastrar um novo usuário
    async function cadastrar(nome: string, cpf: string, codigoEmpresarial: string, senha: string, imagem: File | null) {
        try {
            await cadastrarUsuario(nome, cpf, codigoEmpresarial, senha, imagem); // Chama o serviço de cadastro
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            throw new Error('Falha no cadastro');
        }
    }

    // Função de logout
    function logout() {
        localStorage.removeItem('token'); // Remove o token do localStorage
        setToken(null); // Reseta o estado do token
        setUser(null); // Reseta o estado de autenticação
    }

    // Verificar se o token ainda é válido
    useEffect(() => {
        if (token) {
            // Se o token for válido, carregamos as informações do usuário
            loadUserData(token); // Chama a função para carregar os dados do usuário com o token
        }
    }, [token]); // Sempre que o token mudar, executa a verificação

    return (
        <AuthContext.Provider value={{ user, token, login, logout, cadastrar }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
