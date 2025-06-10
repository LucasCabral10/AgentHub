import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Select, Button, VStack } from '@chakra-ui/react';

const Agentes: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Agentes</Heading>
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel>Modelo</FormLabel>
          <Select placeholder="Selecione o modelo">
            <option value="openai">OpenAI</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>API Key</FormLabel>
          <Input placeholder="Chave da API" />
        </FormControl>
        <FormControl>
          <FormLabel>Temperatura</FormLabel>
          <Input placeholder="Temperatura" type="number" />
        </FormControl>
        <FormControl>
          <FormLabel>Prompt Base</FormLabel>
          <Input placeholder="Prompt base" />
        </FormControl>
        <FormControl>
          <FormLabel>Tempo de Memória (min)</FormLabel>
          <Input placeholder="Tempo de memória" type="number" />
        </FormControl>
        <Button colorScheme="blue">Salvar Agente</Button>
      </VStack>
    </Box>
  );
};

export default Agentes;
