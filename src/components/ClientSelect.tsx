import React, { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getClientes } from '../lib/api';

interface Cliente {
  id: string;
  nome: string;
}

const ClientSelect: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    loadClientes();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      navigate(`/cliente/${selectedId}/dashboard`);
    }
  };

  return (
    <VStack spacing={4} justify="center" align="center" height="100vh">
      <select onChange={handleSelectChange} style={{ padding: '8px', fontSize: '16px' }}>
        <option value="">Selecione um cliente...</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nome}
          </option>
        ))}
      </select>
    </VStack>
  );
};

export default ClientSelect;
