import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onOpenSettings?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenSettings }) => {
  return (
    <Box minH="100vh" bg="gray.50" pl="250px">
      <Sidebar />
      <Header onOpenSettings={onOpenSettings} />
      <Container maxW="7xl" py={8}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
