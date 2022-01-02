import { Typography } from '@mui/material';
import { theme } from '@theme';
import React from 'react';

interface RAdditionalItemProps {
  title?: string;
  content?: string;
}

const RAdditionalItem = ({ title, content }: RAdditionalItemProps) => {
  return (
    <>
      <Typography variant="subtitle2" color={theme.palette.primary.main}>
        {title}
      </Typography>
      <Typography variant="subtitle2" color={theme.palette.common.white}>
        {content}
      </Typography>
    </>
  );
};

export default RAdditionalItem;
