import styled from '@emotion/styled';
import { Box } from '@mui/material';
import RModal from '@components/Modal';

export const ConnectWalletButton = styled(Box)<{ disabled?: boolean }>`
  background-color: ${({ theme }) => theme.palette.common.black};
  padding: ${({ theme }) => theme.spacing(1.5)};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  opacity: ${({ disabled }) => disabled && 0.3};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`;

export const StyledRModal = styled(RModal)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: ${({ theme }) => theme.spacing(2.5)};
  background-color: ${({ theme }) => theme.palette.grey[900]};
`;
