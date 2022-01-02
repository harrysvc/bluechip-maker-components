import styled from '@emotion/styled';
import { Box, Container, Grid, Typography } from '@mui/material';

export const StyledContentPage = styled(Box)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  background-size: contain;
`;

export const StyledContainer = styled(Container)`
  width: 100%;
`;

export const Title = styled(Typography)`
  font-size: ${({ theme }) => theme.spacing(7)};
`;

export const StyledFilterBar = styled(Grid)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    position: sticky;
    top: ${({ theme }) => theme.spacing(2)};
    height: max-content;
  }
`;

export const StyledSort = styled(Box)`
  background-color: ${({ theme }) => theme.palette.common.black};
`;
