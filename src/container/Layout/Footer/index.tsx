import { Typography } from '@mui/material';
import React from 'react';

import { StyledFooter } from './Footer.styled';
import { theme } from '@theme';

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="h6" color={theme.palette.common.white} py={2.875} textAlign="center">
        © 2021 RedFOX Labs. All Rights Reserved.
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
