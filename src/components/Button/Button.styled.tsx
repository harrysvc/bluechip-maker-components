import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)<{
  height?: number;
  width?: number;
  uppercase?: boolean;
  shape?: 'curved' | 'none';
}>`
  height: ${({ height, theme }) => height && theme.spacing(height)};
  width: ${({ width, theme }) => width && theme.spacing(width)};
  border-radius: ${({ theme, shape = 'none' }) => (shape !== 'none' ? theme.spacing(1) : 0)};
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  transition-duration: 0.3s;
  &:hover {
    transform: scale(0.99);
  }
`;
