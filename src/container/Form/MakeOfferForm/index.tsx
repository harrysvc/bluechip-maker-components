import RButton from '@components/Button';
import RInput from '@components/Input';
import { LINK_OPENSEA_SWAP } from '@constant/variables';
import { Box, CircularProgress, FormControl, FormHelperText, MenuItem, Select, Typography } from '@mui/material';
import { OpenSeaFungibleToken } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import { Formik, FormikConfig } from 'formik';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { StyledWapper } from './MakeOfferForm.styled';

export interface RMakeOfferFormProps {
  startAmount: number;
  date: Date;
  paymentTokenAddress?: string;
}

const RMakeOfferForm = (props: FormikConfig<RMakeOfferFormProps>) => {
  const { data } = useSelector((state) => state.nft.detail);
  const { status } = useSelector((state) => state.nft.offer);

  const formSchema = Yup.object().shape({
    startAmount: Yup.number().moreThan(0, 'Amount must be larger than 0'),
  });

  const fitlerDuplicatedToken = useMemo(() => {
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

  return (
    <Formik {...props} validationSchema={formSchema}>
      {({ isValid, values, handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched }) => {
        return (
          <>
            <StyledWapper display="grid" alignItems="center" gap={2}>
              <RInput
                type="number"
                name="startAmount"
                label="Price"
                placeholder="Enter price"
                value={values.startAmount}
                error={!!errors.startAmount && !!touched.startAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />

              <RInput
                label="Next appointment"
                type="datetime-local"
                value={moment(values.date).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => {
                  setFieldValue('date', e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {fitlerDuplicatedToken.length && (
                <FormControl fullWidth>
                  <Typography mb={1} variant="caption">
                    Currency
                  </Typography>
                  <Select
                    fullWidth
                    onChange={(e) => {
                      setFieldValue('paymentTokenAddress', e.target.value);
                    }}
                    value={values.paymentTokenAddress}>
                    {fitlerDuplicatedToken.map((item, index) => (
                      <MenuItem value={item.address} key={index}>
                        {item.symbol}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </StyledWapper>
            <Box mt={1}>{!!errors.startAmount && !!touched.startAmount && <FormHelperText error>{errors.startAmount}</FormHelperText>}</Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2} mt={2}>
              <RButton
                disabled={status === RequestStatus.Loading || !isValid}
                startIcon={status === RequestStatus.Loading && <CircularProgress size={15} />}
                height={5.5}
                color="primary"
                variant="contained"
                onClick={() => handleSubmit()}>
                Make Offer
              </RButton>
              <RButton
                disabled={status === RequestStatus.Loading}
                height={5.5}
                color="primary"
                variant="contained"
                onClick={() => {
                  window.open(LINK_OPENSEA_SWAP, '_blank');
                }}>
                Swap ETH to WETH
              </RButton>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default RMakeOfferForm;
