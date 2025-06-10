import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Button,
  SimpleGrid,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import { Plus, Search } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { Cliente } from '../../lib/supabase';
import ClienteCard from './ClienteCard';
import ClienteForm from './ClienteForm';

interface ClienteManagementProps {
  onSelectCliente: (cliente: Cliente) => void;
}

const ClienteManagement: React.FC<ClienteManagementProps> = ({ onSelectCliente }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    loadClientes();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cliente_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClientes(filtered);
  }, [clientes, searchTerm]);

  const loadClientes = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getClientes();
      setClientes(data);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar clientes.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCliente = () => {
    setSelectedCliente(null);
    onFormOpen();
  };

  const handleEditCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    onFormOpen();
  };

  const handleDeleteCliente = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    if (!clienteToDelete) return;

    try {
      await apiClient.deleteCliente(clienteToDelete.id);
      toast({
        title: 'Cliente excluído',
        description: 'Cliente foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      loadClientes();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao excluir cliente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onDeleteClose();
      setClienteToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    loadClientes();
  };

  if (isLoading) {
    return (
      <VStack spacing={8} align="stretch">
        <Text>Carregando clientes...</Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <HStack justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="lg" color="brand.500">
              Gerenciamento de Clientes
            </Heading>
            <Text color="gray.600" mt={1}>
              Configure e gerencie seus clientes e agentes de IA
            </Text>
          </Box>
          <Button
            leftIcon={<Plus size={16} />}
            colorScheme="brand"
            onClick={handleCreateCliente}
          >
            Novo Cliente
          </Button>
        </HStack>

        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Search size={16} color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>

      {filteredClientes.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Text color="gray.500" fontSize="lg">
            {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
          </Text>
          {!searchTerm && (
            <Button
              leftIcon={<Plus size={16} />}
              colorScheme="brand"
              mt={4}
              onClick={handleCreateCliente}
            >
              Criar Primeiro Cliente
            </Button>
          )}
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredClientes.map((cliente) => (
            <ClienteCard
              key={cliente.id}
              cliente={cliente}
              onEdit={handleEditCliente}
              onDelete={handleDeleteCliente}
              onManage={onSelectCliente}
            />
          ))}
        </SimpleGrid>
      )}

      <ClienteForm
        isOpen={isFormOpen}
        onClose={onFormClose}
        onSuccess={handleFormSuccess}
        cliente={selectedCliente}
      />

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Cliente
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o cliente{' '}
              <Text as="span" fontWeight="bold">
                {clienteToDelete?.nome}
              </Text>
              ? Esta ação não pode ser desfeita e irá remover todos os dados
              relacionados (números, agentes, plugins).
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default ClienteManagement;