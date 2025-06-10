import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { apiClient } from '../../lib/api';
import { Cliente } from '../../lib/supabase';

interface WebhookProps {
  cliente: Cliente;
}

const Webhook: React.FC<WebhookProps> = ({ cliente }) => {
  const [messages, setMessages] = useState([]);
  const toast = useToast();

  useEffect(() => {
    loadMessages();
  }, [cliente.id]);

  const loadMessages = async () => {
    try {
      const data = await apiClient.getMessages(cliente.id);
      setMessages(data);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar mensagens.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <HStack justify="space-between" align="center">
        <Heading size="lg" color="brand.500">
          Webhook
        </Heading>
      </HStack>

      <Box>
        <Text>URL do Webhook:</Text>
        <Text fontWeight="bold" color="blue.500">
          https://agenthub.com/webhook/{cliente.id}
        </Text>
      </Box>

      <Box>
        <Heading size="md">Exemplo de Payload JSON</Heading>
        <Box bg="gray.50" p={4} borderRadius="md">
          <pre>
            {JSON.stringify(
              {
                remoteJid: '556598899999@s.whatsapp.net',
                mensagem: 'Olá, como posso ajudar?',
                tipo: 'texto',
              },
              null,
              2
            )}
          </pre>
        </Box>
      </Box>

      <Box>
        <Heading size="md">Últimas Mensagens Processadas</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {messages.map((message, index) => (
            <Box key={index} p={4} bg="gray.50" borderRadius="md">
              <Text><strong>Número:</strong> {message.numero}</Text>
              <Text><strong>Conteúdo:</strong> {message.conteudo}</Text>
              <Text><strong>Resposta:</strong> {message.resposta}</Text>
              <Text><strong>Tipo:</strong> {message.tipo}</Text>
              <Text><strong>Recebido em:</strong> {new Date(message.recebido_em).toLocaleString()}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Webhook;
