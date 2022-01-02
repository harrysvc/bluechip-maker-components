import RModal, { RModalProps } from '@components/Modal';
import RBidItemForm, { RBidItemFormProps } from '@container/Form/BidItemForm';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Order } from '@typings/marketplace/opensea';
import { nftActions } from '@stores/slices/nft';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import { theme } from '@theme';

type RBidItemModalProps = Omit<RModalProps, 'children'> & {
  order?: Order | null;
  currentBidPrice: number;
};

const RBidItemModal = ({ order, currentBidPrice, ...props }: RBidItemModalProps) => {
  const initialValues = {
    bidPrice: 0,
    expirationDate: new Date(),
  };
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const { library } = useWeb3React();
  const { account } = useWallet();

  const { data } = useSelector((state) => state.nft.detail);

  const [tokenAddress = '', tokenId = ''] = useMemo(() => {
    if (slug) {
      return [slug[0], slug[1]];
    }
    return [];
  }, [slug]);

  const handleSubmit = (values: RBidItemFormProps) => {
    if (tokenAddress && tokenId && order?.payment_token_contract && data && account) {
      dispatch(
        nftActions.bidSaleRequest({
          provider: library,
          asset: { tokenAddress, tokenId, schemaName: data.asset_contract.schema_name },
          accountAddress: account,
          paymentTokenAddress: order.payment_token_contract?.symbol,
          expirationTime: moment(values.expirationDate).unix(),
          startAmount: Number(values.bidPrice),
        }),
      );
    }
  };

  return (
    <RModal {...props} width={550}>
      <>
        <Box mb={3} textAlign="center">
          <Typography variant="h4" color="primary">
            Bid NFT
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6" color={theme.palette.common.white}>
            Current Top bid price {currentBidPrice}
          </Typography>
        </Box>
        <RBidItemForm onSubmit={handleSubmit} initialValues={initialValues} currentBidPrice={currentBidPrice} />
      </>
    </RModal>
  );
};

export default RBidItemModal;
