import axios from 'axios';

interface Cliente {
  id: string;
  nome: string;
  // adicione outras propriedades conforme o retorno da API
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Função para obter todos os clientes
export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await apiClient.get<Cliente[]>('/clientes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export { apiClient };
