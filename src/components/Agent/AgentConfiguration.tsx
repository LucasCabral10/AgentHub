import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Text,
  Box,
} from '@chakra-ui/react';
import { Save, ArrowLeft } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { Cliente } from '../../lib/supabase';

interface AgentConfigurationProps {
  cliente: Cliente;
  onBack: () => void;
}

const AgentConfiguration: React.FC<AgentConfigurationProps> = ({ cliente, onBack }) => {
  const [agentConfig, setAgentConfig] = useState({
    modelo: 'OpenAI',
    apiKey: '',
    temperatura: 0.7,
    prompt_base: 'Você é um assistente útil e amigável.',
    memoria_tempo_min: 30,
  });

  const toast = useToast();

  useEffect(() => {
    loadConfiguration();
  }, [cliente.id]);

  const loadConfiguration = async () => {
    try {
      const agente = await apiClient.getAgente(cliente.id);
      if (agente) {
        setAgentConfig({
          modelo: agente.modelo || 'OpenAI',
          apiKey: agente.apiKey || '',
          temperatura: agente.temperatura || 0.7,
          prompt_base: agente.prompt_base || 'Você é um assistente útil e amigável.',
          memoria_tempo_min: agente.memoria_tempo_min || 30,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar configuração',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      await apiClient.saveAgente({
        cliente_id: cliente.id,
        ...agentConfig,
      });

      toast({
        title: 'Configuração salva',
        description: 'Todas as configurações foram salvas com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar',
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
        <HStack spacing={4}>
          <Button
            leftIcon={<ArrowLeft size={16} />}
            variant="ghost"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Box>
            <Heading size="lg" color="brand.500">
              {cliente.nome}
            </Heading>
            <Text color="gray.600">Configuração do Agente IA</Text>
          </Box>
        </HStack>
        
        <Button
          leftIcon={<Save size={16} />}
          colorScheme="brand"
          onClick={handleSaveConfiguration}
        >
          Salvar Configuração
        </Button>
      </HStack>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Configuração do Modelo</Tab>
          <Tab>Outras Configurações</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Modelo IA</FormLabel>
                <Select
                  value={agentConfig.modelo}
                  onChange={(e) => setAgentConfig({ ...agentConfig, modelo: e.target.value })}
                >
                  <option value="OpenAI">OpenAI</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Chave da API</FormLabel>
                <Input
                  value={agentConfig.apiKey}
                  onChange={(e) => setAgentConfig({ ...agentConfig, apiKey: e.target.value })}
                  placeholder="Insira sua chave da API"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Temperatura ({agentConfig.temperatura})</FormLabel>
                <NumberInput
                  value={agentConfig.temperatura}
                  onChange={(_, num) => setAgentConfig({ ...agentConfig, temperatura: num || 0.7 })}
                  min={0}
                  max={2}
                  step={0.1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Tempo de Memória (minutos)</FormLabel>
                <NumberInput
                  value={agentConfig.memoria_tempo_min}
                  onChange={(_, num) => setAgentConfig({ ...agentConfig, memoria_tempo_min: num || 30 })}
                  min={5}
                  max={1440}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Prompt Base</FormLabel>
                <Textarea
                  value={agentConfig.prompt_base}
                  onChange={(e) => setAgentConfig({ ...agentConfig, prompt_base: e.target.value })}
                  placeholder="Defina como seu agente deve se comportar..."
                  rows={6}
                />
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Text>Outras configurações podem ser adicionadas aqui.</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default AgentConfiguration;
