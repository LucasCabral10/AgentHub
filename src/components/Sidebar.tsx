import React from 'react';
import { Box, VStack, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box as="nav" width="250px" bg="gray.100" p={4}>
      <VStack align="start" spacing={4}>
        <Link as={NavLink} to="/dashboard" activeClassName="active">
          Dashboard
        </Link>
        <Link as={NavLink} to="/instancias" activeClassName="active">
          Instâncias
        </Link>
        <Link as={NavLink} to="/agentes" activeClassName="active">
          Agentes
        </Link>
        <Link as={NavLink} to="/numeros" activeClassName="active">
          Números
        </Link>
        <Link as={NavLink} to="/plugins" activeClassName="active">
          Plugins
        </Link>
        <Link as={NavLink} to="/base-de-conhecimento" activeClassName="active">
          Base de Conhecimento
        </Link>
        <Link as={NavLink} to="/webhook" activeClassName="active">
          Webhook
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
