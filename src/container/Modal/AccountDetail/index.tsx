import { RModalProps } from '@components/Modal';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { theme } from '@theme';
import React, { useEffect, useRef, useState } from 'react';
import { useWallet } from 'use-wallet';
import { StyledRModal } from './AccountDetail.styled';
import { getAddressOnExplorer, trimAccountAddress } from '@utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RButton from '@components/Button';

type Props = Omit<RModalProps, 'children'> & {
  onChangeWallet: () => void;
};

const AccountDetailModal = ({ onChangeWallet, ...props }: Props) => {
  const wallet = useWallet();
  const addressRef = useRef<HTMLSpanElement>(null);

  const handleCopy = async () => {
    if (wallet.account) {
      await navigator.clipboard?.writeText(wallet.account);
    }
  };

  return (
    <StyledRModal {...props} isLoading={wallet.status === 'connecting'} width={418}>
      <Typography variant="h2" mb={3} color={theme.palette.common.white}>
        ACCOUNT
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography mr={2} variant="h5">
          Connected with {(wallet as any).providerInfo.name}
        </Typography>
        <RButton size="small" variant="contained" shape="curved" onClick={() => onChangeWallet()}>
          Change
        </RButton>
      </Box>
      <Box display="flex" alignItems="center">
        {wallet.account && <Typography ref={addressRef}>{trimAccountAddress(wallet.account)}</Typography>}
        <IconButton onClick={handleCopy}>
          <ContentCopyIcon sx={{ color: theme.palette.common.white, fontSize: 15 }} />
        </IconButton>
      </Box>
      {!!wallet.account && !!wallet.chainId && (
        <Link href={getAddressOnExplorer(wallet.account, wallet.chainId)} target="_blank">
          View on explorer
        </Link>
      )}
    </StyledRModal>
  );
};

export default AccountDetailModal;
