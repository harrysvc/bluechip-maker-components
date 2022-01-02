import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledCard = styled(Box)`
  background-color: transparent;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: ${({ theme }) => theme.spacing(2)};
  height: 100%;
`;

export const StyledImage = styled(Box)`
  border-radius: ${({ theme }) => theme.spacing(2)};
  height: ${({ theme }) => theme.spacing(26.875)};
`;

export const Name = styled(Box)`
  border-bottom: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  padding-bottom: ${({ theme }) => theme.spacing(1.25)};
`;
