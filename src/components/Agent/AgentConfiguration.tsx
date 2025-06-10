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
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Divider,
  useToast,
  Text,
  Box,
  Badge,
} from '@chakra-ui/react';
import { Save, ArrowLeft, Phone, Plus, Trash2 } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { Cliente } from '../../lib/supabase';

interface AgentConfigurationProps {
  cliente: Cliente;
  onBack: () => void;
}

const AVAILABLE_PLUGINS = [
  { id: 'calendar_agendamento', name: 'Agendamento de Calendário', description: 'Permite agendar compromissos automaticamente' },
  { id: 'base_conhecimento', name: 'Base de Conhecimento', description: 'Consulta informações em arquivos de conhecimento' },
  { id: 'webhook_integrations', name: 'Integrações Webhook', description: 'Conecta com sistemas externos via webhook' },
  { id: 'payment_processing', name: 'Processamento de Pagamento', description: 'Processa pagamentos e cobranças' },
  { id: 'crm_integration', name: 'Integração CRM', description: 'Sincroniza dados com CRM' },
];

const MODELS = [
  'gpt-4',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
  'claude-3-opus',
  'claude-3-sonnet',
  'claude-3-haiku',
];

const AgentConfiguration: React.FC<AgentConfigurationProps> = ({ cliente, onBack }) => {
  const [agentConfig, setAgentConfig] = useState({
    modelo: 'gpt-3.5-turbo',
    temperatura: 0.7,
    prompt_base: 'Você é um assistente útil e amigável.',
    memoria_tempo_min: 30,
    api_key: '',
  });

  const [numeros, setNumeros] = useState<string[]>([]);
  const [newNumero, setNewNumero] = useState('');
  const [activePlugins, setActivePlugins] = useState<string[]>([]);
  const [baseConhecimento, setBaseConhecimento] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const toast = useToast();

  useEffect(() => {
    loadConfiguration();
  }, [cliente.id]);

  const loadConfiguration = async () => {
    setIsLoading(true);
    try {
      // Carregar configuração do agente
      const agente = await apiClient.getAgente(cliente.id);
      if (agente) {
        setAgentConfig({
          modelo: agente.modelo || 'gpt-3.5-turbo',
          temperatura: agente.temperatura || 0.7,
          prompt_base: agente.prompt_base || 'Você é um assistente útil e amigável.',
          memoria_tempo_min: agente.memoria_tempo_min || 30,
          api_key: agente.api_key || '',
        });
      }

      // Carregar números
      const numerosData = await apiClient.getNumeros(cliente.id);
      setNumeros(numerosData.map((n: any) => n.numero));

      // Carregar plugins
      const pluginsData = await apiClient.getPlugins(cliente.id);
      const active = pluginsData.filter((p: any) => p.ativo).map((p: any) => p.plugin_nome);
      setActivePlugins(active);

      // Carregar base de conhecimento
      const baseData = await apiClient.getBaseConhecimento(cliente.id);
      if (baseData) {
        setBaseConhecimento(baseData.arquivo_url || '');
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar configuração',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNumero = async () => {
    if (!newNumero.trim()) return;

    try {
      await apiClient.createNumero({
        cliente_id: cliente.id,
        numero: newNumero.trim(),
      });
      
      setNumeros([...numeros, newNumero.trim()]);
      setNewNumero('');
      
      toast({
        title: 'Número adicionado',
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

  const handleSaveConfiguration = async () => {
    setIsSaving(true);
    try {
      // Salvar configuração do agente
      await apiClient.saveAgente({
        cliente_id: cliente.id,
        ...agentConfig,
      });

      // Salvar plugins
      for (const plugin of AVAILABLE_PLUGINS) {
        await apiClient.savePlugin({
          cliente_id: cliente.id,
          plugin_nome: plugin.id,
          ativo: activePlugins.includes(plugin.id),
        });
      }

      // Salvar base de conhecimento
      if (baseConhecimento.trim()) {
        await apiClient.saveBaseConhecimento({
          cliente_id: cliente.id,
          arquivo_url: baseConhecimento.trim(),
        });
      }

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
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <VStack>
        <Text>Carregando configuração...</Text>
      </VStack>
    );
  }

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
          isLoading={isSaving}
          loadingText="Salvando..."
        >
          Salvar Configuração
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Números WhatsApp */}
        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Phone size={20} />
                <Heading size="md">Números WhatsApp</Heading>
              </HStack>
              
              <VStack align="stretch" spacing={2}>
                {numeros.map((numero, index) => (
                  <HStack key={index} p={2} bg="gray.50" borderRadius="md">
                    <Text flex={1}>{numero}</Text>
                    <Button size="sm" colorScheme="red" variant="ghost">
                      <Trash2 size={14} />
                    </Button>
                  </HStack>
                ))}
              </VStack>

              <HStack>
                <Input
                  placeholder="Ex: 5511999999999"
                  value={newNumero}
                  onChange={(e) => setNewNumero(e.target.value)}
                />
                <Button
                  leftIcon={<Plus size={16} />}
                  onClick={handleAddNumero}
                  colorScheme="teal"
                >
                  Adicionar
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Configuração do Agente */}
        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Configuração do Modelo</Heading>
              
              <FormControl>
                <FormLabel>Modelo IA</FormLabel>
                <Select
                  value={agentConfig.modelo}
                  onChange={(e) => setAgentConfig({ ...agentConfig, modelo: e.target.value })}
                >
                  {MODELS.map((modelo) => (
                    <option key={modelo} value={modelo}>
                      {modelo}
                    </option>
                  ))}
                </Select>
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
                <FormLabel>API Key</FormLabel>
                <Input
                  value={agentConfig.api_key}
                  onChange={(e) => setAgentConfig({ ...agentConfig, api_key: e.target.value })}
                  placeholder="Insira a chave da API"
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Prompt Base */}
        <Card gridColumn={{ base: 1, lg: "1 / -1" }}>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Prompt Base</Heading>
              <Textarea
                value={agentConfig.prompt_base}
                onChange={(e) => setAgentConfig({ ...agentConfig, prompt_base: e.target.value })}
                placeholder="Defina como seu agente deve se comportar..."
                rows={6}
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Plugins */}
        <Card gridColumn={{ base: 1, lg: "1 / -1" }}>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Plugins Disponíveis</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {AVAILABLE_PLUGINS.map((plugin) => (
                  <Card key={plugin.id} variant="outline" size="sm">
                    <CardBody>
                      <VStack align="stretch" spacing={3}>
                        <HStack justify="space-between">
                          <Text fontWeight="medium">{plugin.name}</Text>
                          <Checkbox
                            isChecked={activePlugins.includes(plugin.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setActivePlugins([...activePlugins, plugin.id]);
                              } else {
                                setActivePlugins(activePlugins.filter(p => p !== plugin.id));
                              }
                            }}
                          />
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {plugin.description}
                        </Text>
                        {activePlugins.includes(plugin.id) && (
                          <Badge colorScheme="green" size="sm">
                            Ativo
                          </Badge>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Base de Conhecimento */}
        <Card gridColumn={{ base: 1, lg: "1 / -1" }}>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Base de Conhecimento</Heading>
              <FormControl>
                <FormLabel>URL ou Caminho do Arquivo</FormLabel>
                <Input
                  value={baseConhecimento}
                  onChange={(e) => setBaseConhecimento(e.target.value)}
                  placeholder="https://exemplo.com/base-conhecimento.pdf"
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </VStack>
  );
};

export default AgentConfiguration;
