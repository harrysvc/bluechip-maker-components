import styled from '@emotion/styled';
import { Stack, Typography, FormControl } from '@mui/material';

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

export const StyledFormControl = styled(FormControl)`
  & .MuiFormControlLabel-root,
  & .MuiRadio-root,
  & .MuiFormLabel-root,
  & .MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;
