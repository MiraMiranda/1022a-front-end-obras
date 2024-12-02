import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/api'; // Certifique-se de que o arquivo api.ts está configurado
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: any;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        }
    }, []);

    async function fetchUser() {
        try {
            const response = await api.get('/usuarios/me');
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            logout();
        }
    }

    function login(token: string) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchUser();
        navigate('/dashboard'); // Redirecionar após login
    }

    function logout() {
        localStorage.removeItem('token');
        api.defaults.headers.common['Authorization'] = '';
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login'); // Redirecionar após logout
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
