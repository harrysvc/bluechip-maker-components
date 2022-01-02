import styled from '@emotion/styled';
import { FormControl } from '@mui/material';

export const FormSearch = styled(FormControl)`
  & .MuiInputLabel-root[data-shrink='false'] {
    color: ${({ theme }) => theme.palette.grey[500]};
  }
  & .MuiInputLabel-root[data-shrink='true'] {
    display: none;
  }
`;
