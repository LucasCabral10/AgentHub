import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Layout from './components/Layout/Layout';
import ClienteManagement from './components/Cliente/ClienteManagement';
import AgentConfiguration from './components/Agent/AgentConfiguration';
import { Cliente } from './lib/supabase';

function App() {
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const handleSelectCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
  };

  const handleBackToClientes = () => {
    setSelectedCliente(null);
  };

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {selectedCliente ? (
          <AgentConfiguration
            cliente={selectedCliente}
            onBack={handleBackToClientes}
          />
        ) : (
          <ClienteManagement onSelectCliente={handleSelectCliente} />
        )}
      </Layout>
    </ChakraProvider>
  );
}

export default App;