import RAdditionalInfo from '@components/AdditionalInfo';
import RButton from '@components/Button';
import NftCard from '@components/NftCard';
import { getPrice, getUsdPriceString } from '@constant/utils';
import { MAX_LIMIT_NUMBER } from '@constant/variables';
import { RMakeOfferFormProps } from '@container/Form/MakeOfferForm';
import RAccordionDetail from '@container/Layout/AccordionDetail';
import RBuyItemModal from '@container/Modal/BuyItem';
import RMakeOfferModal from '@container/Modal/MakeOffer';
import RSellItemModal, { SellFormSubmitValues } from '@container/Modal/SellItem';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { nftActions } from '@stores/slices/nft';
import { theme } from '@theme';
import { OpenSeaFungibleToken, WyvernSchemaName } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from 'use-wallet';
import BigNumber from 'bignumber.js';

import { StyledContainer } from './Asset.styled';

const Asset = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const { library } = useWeb3React();
  const { account } = useWallet();

  const { data: ordersData, status: orderStatus } = useSelector((state) => state.nft.orders);

  const { data, status } = useSelector((state) => state.nft.detail);
  const { data: assetsData, status: assetsStatus } = useSelector((state) => state.nft.list);

  const [action, setAction] = useState<'Buy' | 'Sell' | 'Offer' | null>(null);
  const [items, setItems] = useState<number>(8);

  const isOwner = useMemo(
    () =>
      data?.last_sale?.transaction?.from_account.address.toLowerCase() === account?.toLowerCase() ||
      data?.creator?.address.toLowerCase() === account?.toLowerCase(),
    [data, account],
  );

  const [tokenAddress = '', tokenId = ''] = useMemo(() => {
    if (slug) {
      return [slug[0], slug[1]];
    }
    return [];
  }, [slug]);

  const renderTransactionButton = useMemo(() => {
    if (!account) {
      return (
        <RButton
          onClick={() => {
            const connectWalletButton = document.getElementById('connect-wallet');
            connectWalletButton?.click();
          }}
          height={5.5}
          width={18}
          color="primary"
          variant="contained">
          Login
        </RButton>
      );
    }
    if (isOwner) {
      return (
        <RButton
          onClick={() => {
            setAction('Sell');
          }}
          height={5.5}
          width={18}
          color="primary"
          variant="contained">
          Sell
        </RButton>
      );
    }
    return (
      !!data?.orders?.length && (
        <RButton
          onClick={() => {
            setAction('Buy');
          }}
          height={5.5}
          width={18}
          color="primary"
          variant="contained">
          Buy
        </RButton>
      )
    );
  }, [isOwner, data]);

  const handleMakeOffer = async (values: RMakeOfferFormProps) => {
    if (account && tokenAddress && tokenId && data) {
      dispatch(
        nftActions.makeOfferRequest({
          provider: library,
          asset: { tokenAddress, tokenId, schemaName: data.asset_contract.schema_name },
          accountAddress: account,
          paymentTokenAddress: values.paymentTokenAddress,
          expirationTime: moment(values.date).unix(),
          startAmount: Number(values.startAmount),
        }),
      );
    }
  };

  const handleSubmitSellItem = (values: SellFormSubmitValues) => {
    if (account && tokenAddress && tokenId && data) {
      dispatch(
        nftActions.sellAssetRequest({
          provider: library,
          asset: {
            tokenAddress,
            tokenId,
            schemaName: data ? WyvernSchemaName.ERC721 : WyvernSchemaName.ERC20,
          },
          accountAddress: account,
          ...values,
        }),
      );
    }
  };

  const getPriceAsset = (currentPrice?: BigNumber, openSeaFungibleToken?: OpenSeaFungibleToken) => {
    if (!currentPrice) {
      return;
    }
    const amount = getPrice(currentPrice, openSeaFungibleToken);
    return amount;
  };

  const getUsdString = (amount?: number, currency?: string, exchangeRate?: string) => {
    if ((currency !== 'ETH' && !exchangeRate) || !amount) return '';
    const usdValue = getUsdPriceString({
      amount,
      exchangeRate: Number(exchangeRate),
    });
    return `$ ${usdValue}`;
  };

  useEffect(() => {
    if (tokenAddress && tokenId) {
      dispatch(nftActions.getAssetRequest({ tokenAddress, tokenId }));
      dispatch(nftActions.getEventsRequest({ asset_contract_address: tokenAddress, token_id: tokenId }));
      dispatch(nftActions.getAssetOrdersRequest({ asset_contract_address: tokenAddress, token_id: tokenId }));
    }
    return;
  }, [tokenAddress, tokenId]);

  if (status === RequestStatus.Loading) {
    return (
      <Box textAlign="center" py={30}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || status === RequestStatus.Failed) return <></>;

  return (
    <>
      <Box pt={15}>
        <StyledContainer maxWidth="xl">
          <Box pb={12}>
            <Grid container spacing={12.5} display="flex" justifyContent="center">
              <Grid item xs={12} md={5}>
                <Box height={theme.spacing(56)} overflow="hidden" position="relative">
                  {data?.image_url && (
                    <Image src={data?.image_url} width="100%" height="100%" layout="fill" objectFit="cover" objectPosition="center" alt={data.name} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography variant="h1" color={theme.palette.primary.main} mb={2.5}>
                  {data?.name}
                </Typography>
                <Box mb={2.5}>
                  <Box mb={2.75} mt={2.5}>
                    <Typography color={theme.palette.common.white}>Listing Price</Typography>
                  </Box>
                  {!!ordersData?.[0] && (
                    <Box display="flex" alignItems="center" gap={0.625}>
                      <Typography color="primary" variant="h3">
                        {`${getPrice(new BigNumber(ordersData?.[0].base_price), ordersData?.[0].payment_token_contract)} ${
                          ordersData?.[0].payment_token_contract?.symbol
                        } `}
                      </Typography>
                      <Typography variant="body2">
                        $
                        {getUsdString(
                          getPrice(new BigNumber(ordersData?.[0].base_price), ordersData?.[0].payment_token_contract),
                          ordersData?.[0].payment_token_contract?.symbol,
                          ordersData?.[0].payment_token_contract?.usd_price,
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box>
                  <RAdditionalInfo tokenId={String(data.token_id)} type={data.name} category={data.collection.name} />
                  <Box mt={2} mb={3}>
                    {renderTransactionButton}
                  </Box>
                  <RAccordionDetail />
                  <Box mt={2.75}>
                    {!isOwner && !!account && (
                      <RButton onClick={() => setAction('Offer')} height={5.5} width={18} color="primary" variant="contained">
                        MAKE OFFER
                      </RButton>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </StyledContainer>
      </Box>
      <RSellItemModal open={action === 'Sell'} onClose={() => setAction(null)} handleSubmit={handleSubmitSellItem} />
      <RMakeOfferModal open={action === 'Offer'} handleSubmit={handleMakeOffer} onClose={() => setAction(null)} />
      {!!data.orders?.length && <RBuyItemModal order={data.orders[0]} open={action === 'Buy'} onClose={() => setAction(null)} />}
    </>
  );
};
export default Asset;
