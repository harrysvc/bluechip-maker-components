import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalWrapper = styled(Box)<{ width?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: ${({ theme }) => theme.spacing(4)};
  overflow-y: auto;
  max-width: 80vw;
  max-height: 80vw;
`;
