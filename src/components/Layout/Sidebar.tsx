import React, { useState, useEffect } from 'react';
import { VStack, Box, Text, Link, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { getClientes } from '../../lib/api';
import { Cliente } from '../../lib/supabase';

const Sidebar: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

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

  return (
    <Flex direction="column" align="stretch" p={4} bg="gray.100" minH="100vh" w="250px" position="fixed">
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="bold" color="brand.500">
          Clientes
        </Text>
        {clientes.map((cliente) => (
          <NavLink key={cliente.id} to={`/cliente/${cliente.id}`} activeClassName="active">
            <Link display="block" py={2}>{cliente.nome}</Link>
          </NavLink>
        ))}
      </Box>
      <Box mt="auto">
        <Text fontSize="lg" fontWeight="bold" color="brand.500">
          Configurações Gerais
        </Text>
        <NavLink to="/configuracoes" activeClassName="active">
          <Link display="block" py={2}>Configurações</Link>
        </NavLink>
      </Box>
    </Flex>
  );
};

export default Sidebar;
