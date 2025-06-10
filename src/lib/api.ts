import axios from 'axios';

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Ensure the base URL is correct
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define a function to get clients
export const getClientes = async () => {
  try {
    const response = await apiClient.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export { apiClient };
