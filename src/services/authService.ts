import axios from 'axios';

// Defina a interface LoginResponse com a estrutura esperada da resposta
interface LoginResponse {
    token: string;  // O token retornado pela API
}

// Função para login de usuário
export async function login(codigoEmpresarial: string, senha: string): Promise<LoginResponse> {
    try {
        // Tipagem do axios com o tipo LoginResponse para garantir que a resposta tenha um 'token'
        const response = await axios.post<LoginResponse>('/usuarios/login', {
            codigoEmpresarial,
            senha,
        });

        // Aqui, a resposta já é tipada como LoginResponse, então o TypeScript garante que response.data tenha 'token'
        if (response.data && response.data.token) {
            return response.data;  // Não é necessário fazer cast porque já foi tipado
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
        const response = await axios.post('/usuarios/cadastro', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw new Error('Erro ao cadastrar usuário');
    }
}
