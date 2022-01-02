import RButton from '@components/Button';
import styled from '@emotion/styled';
import { TextField, Typography, Box } from '@mui/material';

export const SearchTitle = styled(Typography)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[500]};
`;

export const Search = styled(Box)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing(2)};
`;

export const SearchInput = styled(TextField)`
  background-color: ${({ theme }) => theme.palette.common.black};
  & .MuiOutlinedInput-root {
    height: ${({ theme }) => theme.spacing(5.625)};
  }
  & .MuiInputLabel-root[data-shrink='false'] {
    color: ${({ theme }) => theme.palette.grey[500]};
  }
  & .MuiInputLabel-root[data-shrink='true'] {
    display: none;
  }
  & .MuiOutlinedInput-input {
    color: ${({ theme }) => theme.palette.common.black};
  }
`;

export const SearchButton = styled(RButton)`
  color: ${({ theme }) => theme.palette.common.white};
  background-color: ${({ theme }) => theme.palette.common.white};
  position: absolute;
  right: 0;
  top: 0;
`;
