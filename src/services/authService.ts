import axios from 'axios';

// Defina a interface LoginResponse com a estrutura esperada da resposta
interface LoginResponse {
    token: string;  // O token retornado pela API
}

// Configuração base do Axios (caso precise usar em outras partes do seu código)
const api = axios.create({
    baseURL: 'https://one022a-marketplace-9o8f.onrender.com', // URL do back-end
});

// Função para login de usuário
export async function login(codigoEmpresarial: string, senha: string): Promise<LoginResponse> {
    try {
        // Realizando a requisição de login usando o axios configurado com a URL base
        const response = await api.post<LoginResponse>('/usuarios/login', {
            codigoEmpresarial,
            senha,
        });

        // A resposta já está tipada como LoginResponse, então o TypeScript vai garantir que response.data.token exista
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

// Função para cadastrar usuário
export async function cadastrarUsuario(
    nome: string,
    cpf: string,
    codigoEmpresarial: string,
    senha: string,
    imagem: File | null
) {
    try {
        // Formando o corpo da requisição para cadastro
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('cpf', cpf);
        formData.append('codigoEmpresarial', codigoEmpresarial);
        formData.append('senha', senha);
        if (imagem) formData.append('imagem', imagem);

        // Realizando a requisição de cadastro do usuário
        const response = await api.post('/cadastro', formData, {  // Usando o Axios configurado com baseURL
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw new Error('Erro ao cadastrar usuário');
    }
}

export default api;
