import styled from '@emotion/styled';
import { FormControl } from '@mui/material';

export const StyledFormControl = styled(FormControl)`
  & .MuiRadio-root,
  & .MuiFormControlLabel-root,
  & .MuiFormLabel-root,
  & .MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;
