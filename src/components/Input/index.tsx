import { FormControl, Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

import { StyledTextField } from './Input.styled';

const RInput = ({ label, ...props }: TextFieldProps) => {
  return (
    <FormControl fullWidth={props.fullWidth}>
      {label && (
        <Typography variant="caption" mb={1}>
          {label}
        </Typography>
      )}
      <StyledTextField variant="outlined" {...props} />
    </FormControl>
  );
};

export default RInput;
