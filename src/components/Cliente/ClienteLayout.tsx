import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import ClientSelect from '../ClientSelect';

const ClienteLayout: React.FC = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  return (
    <Flex direction="column" minH="100vh">
      {/* Top header with client select as the exclusive navigation menu */}
      <Box bg="gray.200" p={4}>
        <ClientSelect />
      </Box>
      <Flex flex="1">
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ClienteLayout;
