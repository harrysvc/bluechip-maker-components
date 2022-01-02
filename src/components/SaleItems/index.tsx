import RButton from '@components/Button';
import RModal from '@components/Modal';
import RSaleItem from '@components/SaleItem';
import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { SaleItems } from './SaleItem.styled';

export interface RSaleItemsProps {
  price?: number;
  type?: string;
  usdPrice?: string;
  expiration?: string;
  from?: string;

  children?: ReactNode;
}

const RSaleItems = ({ price, type, usdPrice, expiration, from, children }: RSaleItemsProps) => {
  return (
    <SaleItems py={2.25} display="flex" alignItems="center" justifyContent="space-between">
      <RSaleItem flex={2} pr={2} title="PRICE" value={`${price} ${type}`} />
      <RSaleItem flex={2} px={2} title="USD PRICE" value={!!usdPrice ? usdPrice : '-'} />
      <RSaleItem flex={2} px={2} title="EXPIRATION" value={`${expiration}`} />
      <RSaleItem flex={2} px={2} title="FROM" value={from} />
      <Box flex={2} ml={2}>
        {children}
      </Box>
    </SaleItems>
  );
};

export default RSaleItems;
