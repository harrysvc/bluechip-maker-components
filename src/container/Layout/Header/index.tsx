import RButton from '@components/Button';
import RImage from '@components/Image';
import AccountDetailModal from '@container/Modal/AccountDetail';
import ChooseWalletModal from '@container/Modal/ChooseWallet';
import { Box, ButtonGroup } from '@mui/material';
import { SeaPort } from '@services/opensea';
import { commonActions } from '@stores/slices/common';
import { trimAccountAddress } from '@utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWallet } from 'use-wallet';
import { StyledHeader } from './Header.styled';
import { useWeb3React } from '@web3-react/core';
import { nftActions } from '@stores/slices/nft';

const Header = () => {
  const dispatch = useDispatch();

  const wallet = useWallet();

  const [modalType, setModalType] = useState<'choose-wallet' | 'account-detail' | null>(null);

  useEffect(() => {
    if (wallet.status === 'error' && wallet.error?.message) {
      dispatch(commonActions.showMessage({ message: wallet.error.message || null, type: 'error' }));
    }
  }, [wallet.status, wallet.error]);

  return (
    <>
      <StyledHeader>
        <Box px={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
            <Link href="/">
              <a href="/">
                <RImage src={'/assets/images/logo-primary.webp'} width={143} height={49} objectFit="contain" />
              </a>
            </Link>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <RButton
                variant="contained"
                color="primary"
                shape="curved"
                id="connect-wallet"
                onClick={async () => {
                  setModalType(wallet.isConnected() ? 'account-detail' : 'choose-wallet');
                }}>
                {wallet.isConnected() ? trimAccountAddress(wallet.account || '') : 'Connect To ETH'}
              </RButton>
              {wallet.isConnected() && (
                <RButton
                  onClick={() => {
                    wallet.reset();
                  }}
                  color="inherit"
                  shape="curved">
                  Logout
                </RButton>
              )}
            </ButtonGroup>
          </Box>
        </Box>
      </StyledHeader>
      <ChooseWalletModal
        open={modalType === 'choose-wallet'}
        onClose={() => {
          setModalType(null);
        }}
      />
      <AccountDetailModal
        open={modalType === 'account-detail'}
        onClose={() => {
          setModalType(null);
        }}
        onChangeWallet={() => {
          setModalType('choose-wallet');
        }}
      />
    </>
  );
};

export default Header;
