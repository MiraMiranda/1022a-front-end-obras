import axios from 'axios';

// Definindo a interface LoginResponse com a estrutura esperada da resposta
interface LoginResponse {
    token: string;  // O token retornado pela API
}

// Configuração base do Axios
const api = axios.create({
  baseURL: 'https://one022a-marketplace-9o8f.onrender.com', // URL do back-end
});

// Função para login de usuário
export async function login(codigoEmpresarial: string, senha: string): Promise<LoginResponse> {
    try {
        const response = await api.post<LoginResponse>('/usuarios/login', {
            codigoEmpresarial,
            senha,
        });

        // A resposta já está tipada como LoginResponse, então o TypeScript vai garantir que `response.data.token` exista
        if (response.data && response.data.token) {
            return response.data;
        } else {
            throw new Error('Token não encontrado na resposta');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login');
    }
}

// Você pode exportar outras funções de API conforme necessário
export default api;
