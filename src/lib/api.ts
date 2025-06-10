const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Clientes
  async getClientes() {
    return this.request('/clientes');
  }

  async getCliente(id: string) {
    return this.request(`/clientes/${id}`);
  }

  async createCliente(data: { cliente_id: string; nome: string }) {
    return this.request('/clientes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCliente(id: string, data: { cliente_id?: string; nome?: string }) {
    return this.request(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCliente(id: string) {
    return this.request(`/clientes/${id}`, {
      method: 'DELETE',
    });
  }

  // Números WhatsApp
  async getNumeros(clienteId: string) {
    return this.request(`/numeros/cliente/${clienteId}`);
  }

  async createNumero(data: { cliente_id: string; numero: string }) {
    return this.request('/numeros', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteNumero(id: number) {
    return this.request(`/numeros/${id}`, {
      method: 'DELETE',
    });
  }

  // Agentes
  async getAgente(clienteId: string) {
    return this.request(`/agentes/cliente/${clienteId}`);
  }

  async saveAgente(data: any) {
    return this.request('/agentes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Plugins
  async getPlugins(clienteId: string) {
    return this.request(`/plugins/cliente/${clienteId}`);
  }

  async savePlugin(data: any) {
    return this.request('/plugins', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Base de Conhecimento
  async getBaseConhecimento(clienteId: string) {
    return this.request(`/bases/cliente/${clienteId}`);
  }

  async saveBaseConhecimento(data: any) {
    return this.request('/bases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
