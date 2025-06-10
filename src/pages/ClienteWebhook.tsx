import React from 'react';
import { Heading, Text, Box } from '@chakra-ui/react';

const ClienteWebhook: React.FC = () => {
  return (
    <Box>
      <Heading mb={4}>Webhook do Cliente</Heading>
      <Text>Aqui são exibidas as configurações de webhook do cliente.</Text>
    </Box>
  );
};

export default ClienteWebhook;
