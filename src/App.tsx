import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout/Layout';
import ClienteMenu from './components/Cliente/ClienteMenu';
import ClienteManagement from './components/Cliente/ClienteManagement';
import { ClienteProvider } from './context/ClienteContext';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ClienteProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ClienteManagement />} />
              <Route path="/cliente/:clienteId/*" element={<ClienteMenu />} />
              <Route path="/configuracoes" element={<div>Configurações Gerais</div>} />
            </Routes>
          </Layout>
        </Router>
      </ClienteProvider>
    </ChakraProvider>
  );
};

export default App;
