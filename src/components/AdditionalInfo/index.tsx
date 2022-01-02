import RAdditionalItem from '@components/AdditionalItem';
import { Box } from '@mui/material';
import React from 'react';

import { Info } from './AdditionalInfo.styled';

export interface RAdditionalInfoProps {
  tokenId?: string;
  type?: string;
  category?: string;
}

const RAdditionalInfo = ({ tokenId, type, category }: RAdditionalInfoProps) => {
  return (
    <Info py={2.75}>
      <Box display="flex" justifyContent="space-between" alignContent="center" mb={0.75}>
        <RAdditionalItem title="TOKEN ID" content={tokenId} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignContent="center" mb={0.75}>
        <RAdditionalItem title="TYPE" content={type} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <RAdditionalItem title="CATEGORY" content={category} />
      </Box>
    </Info>
  );
};

export default RAdditionalInfo;
