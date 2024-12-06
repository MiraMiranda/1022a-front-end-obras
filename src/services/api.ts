import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'https://one022a-marketplace-9o8f.onrender.com', // URL do back-end
});

export default api;
