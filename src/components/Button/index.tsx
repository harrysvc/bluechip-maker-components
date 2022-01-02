import React from 'react';
import { ButtonProps } from '@mui/material';
import { StyledButton } from './Button.styled';

export type RButtonProps = ButtonProps & {
  width?: number;
  height?: number;
  uppercase?: boolean;
  shape?: 'curved' | 'none';
};

const RButton = ({ shape, ...props }: RButtonProps) => {
  return (
    <StyledButton shape={shape} {...props}>
      {props.children}
    </StyledButton>
  );
};

export default RButton;
