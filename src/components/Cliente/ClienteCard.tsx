import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  HStack,
  VStack,
  Button,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { Edit3, Trash2, Phone, Bot } from 'lucide-react';
import { Cliente } from '../../lib/supabase';

interface ClienteCardProps {
  cliente: Cliente;
  numerosCount?: number;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
  onManage: (cliente: Cliente) => void;
}

const ClienteCard: React.FC<ClienteCardProps> = ({
  cliente,
  numerosCount = 0,
  onEdit,
  onDelete,
  onManage,
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card bg={cardBg} borderColor={borderColor} transition="all 0.2s">
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <Box>
            <HStack justify="space-between" align="start" mb={2}>
              <VStack align="start" spacing={1}>
                <Heading size="md" color="brand.500">
                  {cliente.nome}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  ID: {cliente.cliente_id}
                </Text>
              </VStack>
              <Badge colorScheme="green" variant="subtle">
                Ativo
              </Badge>
            </HStack>
            
            <HStack spacing={4} mt={3}>
              <HStack spacing={1}>
                <Phone size={14} />
                <Text fontSize="sm" color="gray.600">
                  {numerosCount} número{numerosCount !== 1 ? 's' : ''}
                </Text>
              </HStack>
              <HStack spacing={1}>
                <Bot size={14} />
                <Text fontSize="sm" color="gray.600">
                  Agente configurado
                </Text>
              </HStack>
            </HStack>
          </Box>

          <Divider />

          <HStack spacing={2} justify="stretch">
            <Button
              leftIcon={<Bot size={16} />}
              colorScheme="brand"
              size="sm"
              flex={1}
              onClick={() => onManage(cliente)}
            >
              Gerenciar
            </Button>
            <Button
              leftIcon={<Edit3 size={14} />}
              variant="outline"
              size="sm"
              onClick={() => onEdit(cliente)}
            >
              Editar
            </Button>
            <Button
              leftIcon={<Trash2 size={14} />}
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={() => onDelete(cliente)}
            >
              Excluir
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ClienteCard;
