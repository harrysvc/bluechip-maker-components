import styled from '@emotion/styled';
import { Box, Stack, TextField } from '@mui/material';

export const StyledWapper = styled(Box)`
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`;

export const StackDate = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.common.white};
  width: 100%;
  & .MuiInputLabel-root {
    display: none;
  }
`;

export const Input = styled(TextField)`
  background-color: ${({ theme }) => theme.palette.common.white};
  & .MuiInputLabel-root {
    display: none;
  }
`;
