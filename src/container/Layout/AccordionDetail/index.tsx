import RLineChart from '@components/LineChart';
import RProPerty from '@components/Property';
import RSaleItems from '@components/SaleItems';
import { calculatePrice, getPrice, getUsdPriceString } from '@constant/utils';
import useSkipFirstRunEffect from '@hooks/useSkipFirstRunEffect';
import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { nftActions } from '@stores/slices/nft';
import { theme } from '@theme';
import { Order } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';

import { AccordionContent, AccordionItem, AccordionTitle } from './AccordionDetail.styled';
import { priceHistoryTimes } from './data';
import { useWallet } from 'use-wallet';
import RButton from '@components/Button';
import { NULL_ADDRESS } from '@constant/variables';
import RBuyItemModal from '@container/Modal/BuyItem';
import RBidItemModal from '@container/Modal/BidItem';

enum Panel {
  Panel1 = 'panel1',
  Panel2 = 'panel2',
  Panel3 = 'panel3',
}

const RAccordionDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const { account } = useWallet();
  const { library } = useWeb3React();

  const { data: ordersData, status: orderStatus } = useSelector((state) => state.nft.orders);
  const { data } = useSelector((state) => state.nft.detail);
  const { status: buyStatus } = useSelector((state) => state.nft.buy);
  const { status: bidSaleStatus } = useSelector((state) => state.nft.bid);
  const { status: cancelSaleStatus } = useSelector((state) => state.nft.cancel);
  const events = useSelector((state) => state.nft.events);

  const [expanded, setExpanded] = useState<string>('');
  const [action, setAction] = useState<'Buy' | 'Bid' | 'Cancel' | null>(null);
  const [priceHistoryTime, setPriceHistoryTime] = useState<number>(0);
  const [currentBidOrder, setCurrentBidOrder] = useState<null | Order>();

  const [tokenAddress = '', tokenId = ''] = useMemo(() => {
    if (slug) {
      return [slug[0], slug[1]];
    }
    return [];
  }, [slug]);

  const isOwner = useMemo(
    () =>
      data?.last_sale?.transaction?.from_account.address.toLowerCase() === account?.toLowerCase() ||
      data?.creator?.address.toLowerCase() === account?.toLowerCase(),
    [data, account],
  );

  const currentBidPrice = useMemo(() => {
    if (ordersData?.[0]) {
      return getPrice(new BigNumber(ordersData[0].base_price), ordersData?.[0].payment_token_contract);
    } else if (currentBidOrder) {
      return getPrice(new BigNumber(currentBidOrder.base_price), currentBidOrder?.payment_token_contract);
    }
    return 0;
  }, [currentBidOrder, ordersData]);

  useSkipFirstRunEffect(() => {
    if (tokenAddress && tokenId) {
      dispatch(nftActions.getEventsRequest({ asset_contract_address: tokenAddress, token_id: tokenId, occurred_after: priceHistoryTime }));
    }
  }, [priceHistoryTime]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '');
  };

  const renderSaleButton = (item: Order) => {
    if (!account) {
      return (
        <RButton
          onClick={() => {
            const connectWalletButton = document.getElementById('connect-wallet');
            connectWalletButton?.click();
          }}
          height={5}
          width={18}
          color="primary"
          variant="contained">
          Login
        </RButton>
      );
    }
    const isAddress = item.fee_recipient.address === NULL_ADDRESS;
    return isOwner ? (
      <RButton
        disabled={cancelSaleStatus === RequestStatus.Loading}
        startIcon={cancelSaleStatus === RequestStatus.Loading && <CircularProgress size={15} />}
        color="primary"
        variant="contained"
        width={14}
        height={5}
        onClick={() => {
          dispatch(nftActions.cancelSaleRequest({ provider: library, order: item, accountAddress: account }));
        }}>
        Cancel
      </RButton>
    ) : (
      <RButton
        disabled={(isAddress ? bidSaleStatus : buyStatus) === RequestStatus.Loading}
        startIcon={(isAddress ? bidSaleStatus : buyStatus) === RequestStatus.Loading && <CircularProgress size={15} />}
        color="primary"
        variant="contained"
        width={14}
        height={5}
        onClick={() => handleClick(isAddress, item, account)}>
        {isAddress ? 'Bid' : 'Buy'}
      </RButton>
    );
  };

  const handleClick = (isBid: boolean, item: Order, account: string) => {
    if (isBid) {
      setCurrentBidOrder(item);
      setAction('Bid');
    } else {
      setAction('Buy');
    }
  };

  const getUsdString = (amount?: number, currency?: string, exchangeRate?: string) => {
    if ((currency !== 'ETH' && !exchangeRate) || !amount) return '';
    const usdValue = getUsdPriceString({
      amount,
      exchangeRate: Number(exchangeRate),
    });
    return `$ ${usdValue}`;
  };

  return (
    <>
      <AccordionItem expanded={expanded === Panel.Panel1} onChange={handleChange(Panel.Panel1)}>
        <AccordionTitle color={theme.palette.common.black}>
          <Typography variant="subtitle1" color={theme.palette.common.white}>
            SALES LISTING
          </Typography>
        </AccordionTitle>
        <AccordionContent>
          {orderStatus === RequestStatus.Loading ? (
            <Box textAlign="center" py={10}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            ordersData?.map((item, index) => (
              <RSaleItems
                key={index}
                type={item.payment_token_contract?.symbol}
                price={getPrice(new BigNumber(item.base_price), item.payment_token_contract)}
                usdPrice={getUsdString(
                  getPrice(new BigNumber(item.base_price), item.payment_token_contract),
                  item.payment_token_contract?.symbol,
                  item.payment_token_contract?.usd_price,
                )}
                expiration={moment(item.closing_date).from(item.created_date)}
                from={item.asset_bundle?.maker?.user?.username || 'NullAddress'}>
                {renderSaleButton(item)}
              </RSaleItems>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem expanded={expanded === Panel.Panel2} onChange={handleChange(Panel.Panel2)}>
        <AccordionTitle>
          <Typography variant="subtitle1" color={theme.palette.common.white}>
            PRICE HISTORY
          </Typography>
        </AccordionTitle>
        <AccordionContent>
          <Box my={2}>
            <Select
              onChange={(e) => {
                setPriceHistoryTime(Number(e.target.value));
              }}
              value={priceHistoryTime}>
              {priceHistoryTimes.map((item) => (
                <MenuItem value={item.value} key={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {events.status === RequestStatus.Loading ? (
            <Box textAlign="center" py={10}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <Box>{!!events.data?.length ? <RLineChart data={events.data} /> : <Typography>Have no data</Typography>}</Box>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem expanded={expanded === Panel.Panel3} onChange={handleChange(Panel.Panel3)}>
        <AccordionTitle>
          <Typography variant="subtitle1" color={theme.palette.common.white}>
            PROPERTIES
          </Typography>
        </AccordionTitle>
        <AccordionContent>
          <Box display="flex" gap={2} alignItems="center">
            {data?.traits?.length ? (
              data?.traits?.map((property, index) => {
                return <RProPerty key={index} title={property.trait_type} value={property.value} totalCount={property.trait_count} />;
              })
            ) : (
              <Typography variant="h5" color="primary">
                No properties
              </Typography>
            )}
          </Box>
        </AccordionContent>
      </AccordionItem>
      {!!data?.orders?.length && <RBuyItemModal order={data.orders[0]} open={action === 'Buy'} onClose={() => setAction(null)} />}
      {!!data?.orders?.length && (
        <RBidItemModal currentBidPrice={currentBidPrice} order={currentBidOrder} open={action === 'Bid'} onClose={() => setAction(null)} />
      )}
    </>
  );
};

export default RAccordionDetail;
