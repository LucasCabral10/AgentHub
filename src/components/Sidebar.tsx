import React from 'react';
import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      w="250px"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
    >
      <VStack align="start" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">AgentHub</Text>
        <Link as={NavLink} to="/dashboard" _hover={{ textDecoration: 'none' }}>
          Dashboard
        </Link>
        <Link as={NavLink} to="/instancias" _hover={{ textDecoration: 'none' }}>
          Instâncias
        </Link>
        <Link as={NavLink} to="/agentes" _hover={{ textDecoration: 'none' }}>
          Agentes
        </Link>
        <Link as={NavLink} to="/numeros" _hover={{ textDecoration: 'none' }}>
          Números
        </Link>
        <Link as={NavLink} to="/plugins" _hover={{ textDecoration: 'none' }}>
          Plugins
        </Link>
        <Link as={NavLink} to="/base-conhecimento" _hover={{ textDecoration: 'none' }}>
          Base de Conhecimento
        </Link>
        <Link as={NavLink} to="/webhook" _hover={{ textDecoration: 'none' }}>
          Webhook
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
