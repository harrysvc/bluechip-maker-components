import RImage from '@components/Image';
import { RModalProps } from '@components/Modal';
import { WALLET_CONFIG } from '@constant/config/eth-chains';
import { WALLET_CONNECTORS } from '@constant/enums/eth-chains';
import { Box, Link, Typography } from '@mui/material';
import { theme } from '@theme';
import React, { useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { ConnectWalletButton, StyledRModal } from './ChooseWallet.styled';

const ChooseWalletModal = (props: Omit<RModalProps, 'children'>) => {
  const wallet = useWallet();
  const activate = (connector: keyof typeof WALLET_CONNECTORS) => wallet.connect(connector);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (wallet.status === 'connecting' && wallet.connector === 'portis') {
      timer = setTimeout(() => {
        wallet.reset();
      }, 30000);
      return () => {
        clearTimeout(timer);
      };
    }

    if (wallet.status === 'connected') {
      props.onClose?.({}, 'backdropClick');
    }

    return () => {
      clearTimeout(timer);
    };
  }, [wallet.status]);

  return (
    <StyledRModal {...props} isLoading={wallet.status === 'connecting'} width={418}>
      <Typography variant="h2" mb={3} color={theme.palette.common.white}>
        SELECT A WALLET
      </Typography>
      <Box display="grid" textAlign="center" rowGap={1} mb={2}>
        {WALLET_CONFIG.map((chain) => {
          const disabled = wallet.connector === chain.type && wallet.status === 'connected';
          return (
            <ConnectWalletButton
              disabled={disabled}
              onClick={() => {
                if (!disabled) {
                  activate(chain.type);
                }
              }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography color={theme.palette.common.white}>
                  {chain.name} {disabled && '(Connected)'}
                </Typography>
                <RImage src={`/assets/wallets/${chain.iconName}`} alt={chain.name} width={32} height={32} />
              </Box>
            </ConnectWalletButton>
          );
        })}
      </Box>
      <Box textAlign="center">
        <Link href="https://ethereum.org/wallets/" target="_blank">
          Learn more about wallets
        </Link>
      </Box>
    </StyledRModal>
  );
};

export default ChooseWalletModal;
