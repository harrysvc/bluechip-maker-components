import RButton from '@components/Button';
import RModal, { RModalProps } from '@components/Modal';
import { ETH_ADDRESS } from '@constant/variables';
import { Box, CircularProgress, Typography } from '@mui/material';
import { nftActions } from '@stores/slices/nft';
import { Order } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from 'use-wallet';

type RBuyItemModalProps = Omit<RModalProps, 'children'> & {
  order: Order;
};

const RBuyItemModal = ({ order, ...props }: RBuyItemModalProps) => {
  const dispatch = useDispatch();
  const { library } = useWeb3React();
  const { account } = useWallet();

  const { status } = useSelector((state) => state.nft.buy);

  return (
    <RModal {...props}>
      <Box mb={2}>
        <Typography variant="h4">Buy Item</Typography>
      </Box>
      {account ? (
        <>
          <Box display="inline-block" mr={2}>
            <RButton
              disabled={status === RequestStatus.Loading}
              onClick={() => {
                dispatch(
                  nftActions.buyAssetRequest({
                    provider: library,
                    accountAddress: account,
                    order,
                  }),
                );
              }}
              startIcon={status === RequestStatus.Loading && <CircularProgress size={15} />}
              color="primary"
              variant="contained"
              width={20}
              height={5}>
              Buy now
            </RButton>
          </Box>
          <Box display="inline-block">
            {order.payment_token_contract?.address !== ETH_ADDRESS && (
              <RButton disabled={status === RequestStatus.Loading} color="secondary" variant="contained" width={20} height={5}>
                Swap ETH to ${order.payment_token_contract?.name}
              </RButton>
            )}
          </Box>
        </>
      ) : (
        <RButton
          onClick={() => {
            const connectWalletButton = document.getElementById('connect-wallet');
            connectWalletButton?.click();
          }}
          color="primary"
          variant="contained"
          width={20}
          height={5}>
          Login
        </RButton>
      )}
    </RModal>
  );
};

export default RBuyItemModal;
