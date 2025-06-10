import React, { createContext, useState, useContext, useEffect } from 'react';
import { getClientes } from '../lib/api';
import { Cliente } from '../lib/supabase';

interface ClienteContextProps {
  clientes: Cliente[];
  isLoading: boolean;
}

const ClienteContext = createContext<ClienteContextProps | undefined>(undefined);

export const ClienteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadClientes();
  }, []);

  return (
    <ClienteContext.Provider value={{ clientes, isLoading }}>
      {children}
    </ClienteContext.Provider>
  );
};

export const useClienteContext = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error('useClienteContext must be used within a ClienteProvider');
  }
  return context;
};
