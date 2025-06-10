import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Select, Checkbox, Button, VStack } from '@chakra-ui/react';

const Instancias: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Instâncias</Heading>
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Nome da instância" />
        </FormControl>
        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <Select placeholder="Selecione o tipo">
            <option value="manual">Manual</option>
            <option value="automatica">Automática</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input placeholder="URL da instância" />
        </FormControl>
        <FormControl>
          <FormLabel>Token</FormLabel>
          <Input placeholder="Token de autenticação" />
        </FormControl>
        <FormControl>
          <Checkbox>Ativa</Checkbox>
        </FormControl>
        <FormControl>
          <FormLabel>Números Autorizados</FormLabel>
          <Input placeholder="Lista de números autorizados" />
        </FormControl>
        <Button colorScheme="blue">Salvar Instância</Button>
      </VStack>
    </Box>
  );
};

export default Instancias;
