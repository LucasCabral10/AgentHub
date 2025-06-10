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
} from '@chakra-ui/react';
import { Bot, Settings, Activity } from 'lucide-react';

interface HeaderProps {
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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
            <Button
              leftIcon={<Activity size={16} />}
              variant="ghost"
              size="sm"
              colorScheme="teal"
            >
              Status
            </Button>
            
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
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;