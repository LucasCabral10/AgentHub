import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout/Layout';
import ClienteManagement from './components/Cliente/ClienteManagement';
import ClienteLayout from './components/Cliente/ClienteLayout';
import ClienteDashboard from './pages/ClienteDashboard';
import ClienteInstancias from './pages/ClienteInstancias';
import ClienteAgentes from './pages/ClienteAgentes';
import ClienteNumeros from './pages/ClienteNumeros';
import ClientePlugins from './pages/ClientePlugins';
import ClienteBaseConhecimento from './pages/ClienteBaseConhecimento';
import ClienteWebhook from './pages/ClienteWebhook';
import { ClienteProvider } from './context/ClienteContext';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ClienteProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ClienteManagement />} />
              <Route path="/cliente/:clienteId" element={<ClienteLayout />}>
                <Route path="dashboard" element={<ClienteDashboard />} />
                <Route path="instancias" element={<ClienteInstancias />} />
                <Route path="agentes" element={<ClienteAgentes />} />
                <Route path="numeros" element={<ClienteNumeros />} />
                <Route path="plugins" element={<ClientePlugins />} />
                <Route path="base-de-conhecimento" element={<ClienteBaseConhecimento />} />
                <Route path="webhook" element={<ClienteWebhook />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </ClienteProvider>
    </ChakraProvider>
  );
};

export default App;
