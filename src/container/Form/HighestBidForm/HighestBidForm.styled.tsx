import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';

export const StackDate = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.common.white};
  & .MuiInputLabel-root {
    display: none;
  }
`;

export const TitleInput = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;
