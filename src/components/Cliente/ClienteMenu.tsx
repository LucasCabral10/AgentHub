import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';

const ClienteMenu: React.FC = () => {
  const { clienteId } = useParams<{ clienteId: string }>();
  if (!clienteId) {
    return (
      <VStack align="stretch" spacing={4} p={4} bg="gray.100" minH="100vh">
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="brand.500">
            Menu do Cliente
          </Text>
        </Box>
        <Box>
          <Text color="red.500">ID do cliente não definido.</Text>
        </Box>
      </VStack>
    );
  }
  return (
    <VStack align="stretch" spacing={4} p={4} bg="gray.100">
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="brand.500">
          Menu do Cliente
        </Text>
      </Box>
      <NavLink
        to={`/cliente/${clienteId}/dashboard`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Dashboard
      </NavLink>
      <NavLink
        to={`/cliente/${clienteId}/instancias`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Instâncias
      </NavLink>
      <NavLink
        to={`/cliente/${clienteId}/agentes`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Agentes
      </NavLink>
      <NavLink
        to={`/cliente/${clienteId}/numeros`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Números
      </NavLink>
      <NavLink
        to={`/cliente/${clienteId}/plugins`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Plugins
      </NavLink>
      <NavLink
        to={`/cliente/${clienteId}/base-de-conhecimento`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Base de Conhecimento
      </NavLink>
      <NavLink
        to={`/cliente/${clienteId}/webhook`}
        style={({ isActive }) => ({
          color: isActive ? '#3182CE' : 'inherit',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          padding: '8px'
        })}
      >
        Webhook
      </NavLink>
    </VStack>
  );
};

export default ClienteMenu;
