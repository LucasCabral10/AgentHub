import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Button,
  SimpleGrid,
  useToast,
  Input,
  Checkbox,
  Select,
  Box,
  Text,
} from '@chakra-ui/react';
import { Plus, Trash2 } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { Cliente } from '../../lib/supabase';

interface InstanceManagementProps {
  cliente: Cliente | null; // Allow cliente to be null
}

const InstanceManagement: React.FC<InstanceManagementProps> = ({ cliente }) => {
  const [instances, setInstances] = useState([]);
  const [newInstance, setNewInstance] = useState({
    nome: '',
    tipo: 'manual',
    url: '',
    token: '',
    ativa: true,
    numeros_autorizados: '',
  });
  const toast = useToast();

  useEffect(() => {
    if (cliente) {
      loadInstances();
    }
  }, [cliente]);

  const loadInstances = async () => {
    try {
      if (!cliente) return; // Ensure cliente is defined
      const data = await apiClient.getInstances(cliente.id);
      setInstances(data);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar instâncias.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddInstance = async () => {
    try {
      if (!cliente) return; // Ensure cliente is defined
      await apiClient.createInstance({
        cliente_id: cliente.id,
        ...newInstance,
        numeros_autorizados: newInstance.numeros_autorizados.split(',').map(num => num.trim()),
      });
      setNewInstance({
        nome: '',
        tipo: 'manual',
        url: '',
        token: '',
        ativa: true,
        numeros_autorizados: '',
      });
      loadInstances();
      toast({
        title: 'Instância adicionada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
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
          Instâncias
        </Heading>
        <Button
          leftIcon={<Plus size={16} />}
          colorScheme="brand"
          onClick={handleAddInstance}
          isDisabled={!cliente} // Disable button if cliente is not defined
        >
          Nova Instância
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {instances.map((instance, index) => (
          <Box key={index} p={4} bg="gray.50" borderRadius="md">
            <Text fontWeight="bold">{instance.nome}</Text>
            <Text>Tipo: {instance.tipo}</Text>
            <Text>URL: {instance.url}</Text>
            <Text>Token: {instance.token}</Text>
            <Text>Ativa: {instance.ativa ? 'Sim' : 'Não'}</Text>
            <Text>Números Autorizados: {instance.numeros_autorizados.join(', ')}</Text>
            <Button size="sm" colorScheme="red" variant="ghost" mt={2}>
              <Trash2 size={14} />
            </Button>
          </Box>
        ))}
      </SimpleGrid>

      <Box p={4} bg="gray.50" borderRadius="md">
        <VStack align="stretch" spacing={4}>
          <Input
            placeholder="Nome"
            value={newInstance.nome}
            onChange={(e) => setNewInstance({ ...newInstance, nome: e.target.value })}
          />
          <Select
            value={newInstance.tipo}
            onChange={(e) => setNewInstance({ ...newInstance, tipo: e.target.value })}
          >
            <option value="manual">Manual</option>
            <option value="automatica">Automática</option>
          </Select>
          <Input
            placeholder="URL"
            value={newInstance.url}
            onChange={(e) => setNewInstance({ ...newInstance, url: e.target.value })}
          />
          <Input
            placeholder="Token"
            value={newInstance.token}
            onChange={(e) => setNewInstance({ ...newInstance, token: e.target.value })}
          />
          <Checkbox
            isChecked={newInstance.ativa}
            onChange={(e) => setNewInstance({ ...newInstance, ativa: e.target.checked })}
          >
            Ativa
          </Checkbox>
          <Input
            placeholder="Números Autorizados (separados por vírgula)"
            value={newInstance.numeros_autorizados}
            onChange={(e) => setNewInstance({ ...newInstance, numeros_autorizados: e.target.value })}
          />
        </VStack>
      </Box>
    </VStack>
  );
};

export default InstanceManagement;
