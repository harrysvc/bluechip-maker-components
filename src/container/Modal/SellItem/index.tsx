import RModal, { RModalProps } from '@components/Modal';
import RBundleForm, { RBundleFormProps } from '@container/Form/BundleForm';
import RHighestBidForm, { RHighestBidFormProps } from '@container/Form/HighestBidForm';
import RSetPriceForm, { RSetPriceFormProps } from '@container/Form/SetPriceForm';
import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { SellAssetParams } from '@stores/slices/nft';
import { theme } from '@theme';
import { OpenSeaFungibleToken } from '@typings/marketplace/opensea';
import { omit } from 'lodash';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { StyledFormControl } from './SellItemModal.styled';

export type RSellItemType = {
  setPrice: RSetPriceFormProps;
  highestBid: RHighestBidFormProps;
  bundle: RBundleFormProps;
};

export type SellFormSubmitValues = Omit<SellAssetParams, 'provider' | 'accountAddress' | 'asset'>;

export type RSellItemModalProps = {
  handleSubmit: (values: SellFormSubmitValues) => void;
} & Omit<RModalProps, 'children'>;

const RSellItemModal = ({ handleSubmit, ...props }: RSellItemModalProps) => {
  const { data } = useSelector((state) => state.nft.detail);

  const [action, setAction] = useState<keyof RSellItemType>('setPrice');

  const paymentTokens = useMemo(() => {
    const arr: OpenSeaFungibleToken[] = [];
    if (data) {
      data.collection.payment_tokens?.forEach((element) => {
        if (!arr.find((token) => token.address === element.address)) {
          arr.push(element);
        }
      });
    }
    return arr;
  }, [data]);

  const initialValuesSetPrice: RSellItemType['setPrice'] = {
    startAmount: 0,
    paymentTokenAddress: data?.collection.payment_tokens?.[0].address,
    features: 'none',
  };

  const initialValuesHighestBid: RSellItemType['highestBid'] = {
    startAmount: 0,
    englishAuctionReservePrice: 0,
    paymentTokenAddress: data?.collection.payment_tokens?.[0].address,
    waitForHighestBid: true,
  };

  const initialValuesBundle: RSellItemType['bundle'] = {
    bundleName: '',
    paymentTokenAddress: data?.collection.payment_tokens?.[0].address,
    features: 'none',
    startAmount: 0,
  };

  return (
    <RModal {...props} width={550}>
      <Box>
        <Box>
          <Box my={2}>
            <Typography variant="h3">Sell Item</Typography>
          </Box>
          <StyledFormControl>
            <FormLabel component="legend">Choose your sell method</FormLabel>
            <RadioGroup value={action} onChange={(e) => setAction(e.target.value as any)} row name="action">
              <FormControlLabel color={theme.palette.common.white} value="setPrice" control={<Radio />} label="Set Price" />
              <FormControlLabel value="highestBid" control={<Radio />} label="Highest Bid" />
              <FormControlLabel value="bundle" control={<Radio />} label="Bundle" />
            </RadioGroup>
          </StyledFormControl>
        </Box>
        {action === 'setPrice' && (
          <RSetPriceForm
            initialValues={initialValuesSetPrice}
            paymentTokens={paymentTokens}
            onSubmit={(values) => {
              let finalValues: SellFormSubmitValues = {
                ...values,
                expirationTime: moment(values.expirationTime, 'YYYY-MM-DDThh:mm').unix(),
                listingTime: moment(values.listingTime, 'YYYY-MM-DDThh:mm').unix(),
              };
              switch (values.features) {
                case 'endingPrice':
                  finalValues = omit(finalValues, ['listingTime']);
                  break;
                case 'scheduleFutureTime':
                  finalValues = omit(finalValues, ['expirationTime']);
                  break;
                default:
                  finalValues = omit(finalValues, ['expirationTime', 'listingTime']);
                  break;
              }
              handleSubmit?.(omit(finalValues, ['features', !values.buyerAddress ? 'buyerAddress' : '']) as any);
            }}
          />
        )}
        {action === 'highestBid' && (
          <RHighestBidForm
            paymentTokens={paymentTokens}
            initialValues={initialValuesHighestBid}
            onSubmit={(values) => {
              const finalValues: SellFormSubmitValues = {
                ...values,
                expirationTime: moment(values.expirationTime, 'YYYY-MM-DDThh:mm').unix(),
              };
              handleSubmit?.(omit(finalValues, [!values.expirationTime ? 'expirationTime' : '']) as any);
            }}
          />
        )}
        {action === 'bundle' && (
          <RBundleForm
            paymentTokens={paymentTokens}
            initialValues={initialValuesBundle}
            onSubmit={(values) => {
              let finalValues: SellFormSubmitValues = {
                ...values,
                expirationTime: moment(values.expirationTime, 'YYYY-MM-DDThh:mm').unix(),
                listingTime: moment(values.listingTime, 'YYYY-MM-DDThh:mm').unix(),
              };
              switch (values.features) {
                case 'endingPrice':
                  finalValues = omit(finalValues, ['listingTime']);
                  break;
                case 'scheduleFutureTime':
                  finalValues = omit(finalValues, ['expirationTime']);
                  break;
                default:
                  finalValues = omit(finalValues, ['expirationTime', 'listingTime']);
                  break;
              }
              handleSubmit?.(omit(finalValues, ['features', !values.buyerAddress ? 'buyerAddress' : '']) as any);
            }}
          />
        )}
      </Box>
    </RModal>
  );
};

export default RSellItemModal;
