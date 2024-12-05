import { createContext, useContext, useState, ReactNode } from 'react';
import { login as loginService, cadastrarUsuario } from '../services/authService'; // Importando funções para login e cadastro

// Definindo os tipos para o contexto de autenticação
interface AuthContextType {
    user: any;
    login: (codigoEmpresarial: string, senha: string) => Promise<void>;
    logout: () => void;
    cadastrar: (nome: string, cpf: string, codigoEmpresarial: string, senha: string, imagem: File | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);

    // Função de login
    async function login(codigoEmpresarial: string, senha: string) {
        try {
            const { token } = await loginService(codigoEmpresarial, senha); // Chama o serviço de login
            localStorage.setItem('token', token); // Armazena o token no localStorage
            setUser({ codigoEmpresarial }); // Define o usuário no estado
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw new Error('Falha no login');
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
        setUser(null); // Reseta o estado de autenticação
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, cadastrar }}>
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
