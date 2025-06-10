import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  useColorModeValue,
  Container,
  HStack,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import { Bot, Settings } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientes } from '../../lib/api';

interface HeaderProps {
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { clienteId } = useParams<{ clienteId: string }>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clientes, setClientes] = useState<{ id: string; nome: string }[]>([]);
  const [newClientName, setNewClientName] = useState('');

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    loadClientes();
  }, []);

  const handleNewClientSubmit = () => {
    console.log('Novo cliente:', newClientName);
    onClose();
  };

  return (
    <Box bg={bg} borderBottom="1px" borderColor={borderColor} position="sticky" top={0} zIndex={10}>
      <Container maxW="7xl" py={4}>
        <Flex justify="space-between" align="center">
          <HStack spacing={3}>
            <Box 
              p={2} 
              bg="brand.500" 
              borderRadius="lg" 
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Bot size={24} />
            </Box>
            <Box>
              <Heading size="lg" color="brand.500">
                AgentHub
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Sistema de Gerenciamento de Agentes IA
              </Text>
            </Box>
          </HStack>

          <HStack spacing={3}>
            {onOpenSettings && (
              <Button
                leftIcon={<Settings size={16} />}
                variant="outline"
                size="sm"
                onClick={onOpenSettings}
              >
                Configurações
              </Button>
            )}
            <Button onClick={onOpen} colorScheme="blue" size="sm">
              Cadastrar Novo Cliente
            </Button>
          </HStack>
        </Flex>
      </Container>
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Novo Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Nome do Cliente" 
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleNewClientSubmit}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
