import { Typography } from '@mui/material';
import { theme } from '@theme';
import React from 'react';
import { Property } from './Properties.styled';

export interface RProPertyProps {
  title: string;
  value: string;
  totalCount: number;
}

const RProPerty = ({ title, value, totalCount }: RProPertyProps) => {
  return (
    <Property textAlign="center" py={0.6} px={1}>
      <Typography color={theme.palette.primary.main} variant="subtitle1">
        {title}
      </Typography>
      <Typography color={theme.palette.common.white} variant="h5">
        {value}
      </Typography>
      <Typography color={theme.palette.common.white} variant="caption">
        Total count : {totalCount}
      </Typography>
    </Property>
  );
};

export default RProPerty;
