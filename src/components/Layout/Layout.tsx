import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onOpenSettings?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenSettings }) => {
  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar />
      <Box flex="1" ml="250px">
        <Header onOpenSettings={onOpenSettings} />
        <Container maxW="7xl" py={8}>
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
