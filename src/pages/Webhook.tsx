import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Webhook: React.FC = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  return (
    <Box p={4}>
      <Heading mb={4}>Webhook</Heading>
      <VStack spacing={4} align="start">
        <Text>URL do Webhook:</Text>
        <Text fontWeight="bold">https://agenthub.com/webhook/{clienteId}</Text>
        <Text>Exemplo de Payload JSON:</Text>
        <Box as="pre" p={4} bg="gray.100" borderRadius="md">
          {`{
  "cliente_id": "${clienteId}",
  "mensagem": "Exemplo de mensagem"
}`}
        </Box>
        <Text>Últimas mensagens processadas:</Text>
        {/* Aqui você pode adicionar a lógica para exibir as últimas mensagens processadas */}
      </VStack>
    </Box>
  );
};

export default Webhook;
