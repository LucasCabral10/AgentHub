import React from 'react';
import { VStack, Box, Text, Link } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';

const ClienteMenu: React.FC = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  return (
    <VStack align="stretch" spacing={4} p={4} bg="gray.100" minH="100vh">
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="brand.500">
          Menu do Cliente
        </Text>
      </Box>
      <NavLink to={`/cliente/${clienteId}/dashboard`} activeClassName="active">
        <Link>Dashboard</Link>
      </NavLink>
      <NavLink to={`/cliente/${clienteId}/instancias`} activeClassName="active">
        <Link>Instâncias</Link>
      </NavLink>
      <NavLink to={`/cliente/${clienteId}/agentes`} activeClassName="active">
        <Link>Agentes</Link>
      </NavLink>
      <NavLink to={`/cliente/${clienteId}/numeros`} activeClassName="active">
        <Link>Números</Link>
      </NavLink>
      <NavLink to={`/cliente/${clienteId}/plugins`} activeClassName="active">
        <Link>Plugins</Link>
      </NavLink>
      <NavLink to={`/cliente/${clienteId}/base-de-conhecimento`} activeClassName="active">
        <Link>Base de Conhecimento</Link>
      </NavLink>
      <NavLink to={`/cliente/${clienteId}/webhook`} activeClassName="active">
        <Link>Webhook</Link>
      </NavLink>
    </VStack>
  );
};

export default ClienteMenu;
