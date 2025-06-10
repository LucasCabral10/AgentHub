import React from 'react';
import { Heading, Text, Box } from '@chakra-ui/react';

const ClienteNumeros: React.FC = () => {
  return (
    <Box>
      <Heading mb={4}>Números do Cliente</Heading>
      <Text>Aqui são exibidos os números associados ao cliente.</Text>
    </Box>
  );
};

export default ClienteNumeros;
