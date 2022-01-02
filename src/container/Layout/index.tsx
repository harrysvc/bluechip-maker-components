import Footer from '@container/Layout/Footer';
import Header from '@container/Layout/Header';
import { Box } from '@mui/system';
import { theme } from '@theme';
import React, { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ overflowY: 'auto' }}>
      <Header />
      <Box flexGrow={1} bgcolor={theme.palette.grey[900]}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
