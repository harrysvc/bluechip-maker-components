import RButton from '@components/Button';
import { getPrice, getUsdPriceString } from '@constant/utils';
import { Box, Typography } from '@mui/material';
import { theme } from '@theme';
import { OpenSeaAsset, OpenSeaFungibleToken } from '@typings/marketplace/opensea';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Name, StyledCard, StyledImage } from './NftCard.styled';

export type CardProps = {
  asset?: OpenSeaAsset;
};

const NftCard = ({ asset }: CardProps) => {
  let price = 0;

  const getPriceAsset = (currentPrice?: BigNumber, openSeaFungibleToken?: OpenSeaFungibleToken) => {
    if (!currentPrice) {
      return;
    }
    const amount = getPrice(currentPrice, openSeaFungibleToken);
    price = amount;
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

  if (!asset) {
    return <></>;
  }

  return (
    <StyledCard p={2} display="flex" flexDirection="column">
      <Link href={`/marketplace/asset/${asset.asset_contract.address}/${asset.token_id}`}>
        <a>
          <StyledImage height={theme.spacing(34)} overflow="hidden" position="relative">
            {!!asset.image_preview_url && (
              <Image src={asset?.image_preview_url} width="100%" height="100%" layout="fill" objectFit="cover" alt={asset.name} />
            )}
          </StyledImage>
        </a>
      </Link>
      <Name>
        <Typography color={theme.palette.common.white} variant="h5" textAlign="start" mt={2} mb={1.25}>
          {asset?.name}
        </Typography>
      </Name>
      <Box mb={1.875} mt={1.5}>
        {!!asset.sell_orders?.[0] && (
          <>
            <Typography color={theme.palette.common.white} variant="caption">
              Lowest Price
            </Typography>
            <Typography color={theme.palette.primary.main} variant="h4">
              {`${asset.sell_orders[0].payment_token_contract?.symbol} ${getPriceAsset(
                asset.sell_orders[0].current_price,
                asset.sell_orders[0].payment_token_contract,
              )} (${getUsdString(
                getPriceAsset(asset.sell_orders[0].current_price, asset.sell_orders[0].payment_token_contract),
                asset.sell_orders[0].payment_token_contract?.symbol,
                asset.sell_orders[0].payment_token_contract?.usd_price,
              )})`}
            </Typography>
          </>
        )}
      </Box>
      <Box mt={1.5} flex={1} display="flex" alignItems="flex-end">
        {price !== 0 && (
          <RButton color="secondary" variant="contained" fullWidth height={5} shape="curved">
            Buy Now
          </RButton>
        )}
        {price === 0 && (
          <RButton color="secondary" variant="contained" fullWidth height={5} shape="curved">
            DETAILS
          </RButton>
        )}
      </Box>
    </StyledCard>
  );
};

export default NftCard;
