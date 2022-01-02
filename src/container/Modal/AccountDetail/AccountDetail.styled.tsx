import styled from '@emotion/styled';
import { Box } from '@mui/material';
import RModal from '@components/Modal';

export const StyledRModal = styled(RModal)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: ${({ theme }) => theme.spacing(2.5)};
  background-color: ${({ theme }) => theme.palette.grey[900]};
`;
