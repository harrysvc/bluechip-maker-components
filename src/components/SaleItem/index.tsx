import React from 'react';
import { Item } from './SaleItem.styled';
import { BoxProps, Typography } from '@mui/material';
import { theme } from '@theme';

export type RSaleItemProps = {
  title?: string;
  value?: string;
} & BoxProps;

const RSaleItem = ({ title, value, ...props }: RSaleItemProps) => {
  return (
    <Item {...props}>
      <Typography color={theme.palette.primary.main} mb={0.5}>
        {title}
      </Typography>
      <Typography color={theme.palette.common.white}>{value}</Typography>
    </Item>
  );
};

export default RSaleItem;
