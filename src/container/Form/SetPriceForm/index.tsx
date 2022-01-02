import RButton from '@components/Button';
import RInput from '@components/Input';
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { OpenSeaFungibleToken } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import { Formik, FormikConfig, FormikProps } from 'formik';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { StyledFormControl } from './SellItem.styled';

export type RSetPriceFormProps = {
  startAmount: number;
  paymentTokenAddress?: string;
  buyerAddress?: string;
  expirationTime?: Date;
  listingTime?: Date;
  endAmount?: number;
  features?: 'none' | 'endingPrice' | 'scheduleFutureTime';
};

const RSetPriceForm = ({ paymentTokens, ...props }: FormikConfig<RSetPriceFormProps> & { paymentTokens: OpenSeaFungibleToken[] }) => {
  const { status } = useSelector((state) => state.nft.sell);

  const validateSchema = Yup.object().shape({
    startAmount: Yup.number().moreThan(0, 'Price must be larger than 0').required('Please provide a starting price'),
    endAmount: Yup.mixed().when('features', {
      is: 'endingPrice',
      then: Yup.number().lessThan(Yup.ref('startAmount'), 'Ending price must be less than starting price').required('Please provide a ending price'),
    }),
    expirationTime: Yup.mixed().when('features', {
      is: 'endingPrice',
      then: Yup.string().required('Expiration date is required'),
    }),
    listingTime: Yup.mixed().when('features', {
      is: 'scheduleFutureTime',
      then: Yup.string().required(),
    }),
  });

  const renderSubForm = useCallback(({ values, errors, touched, handleBlur, handleChange }: FormikProps<RSetPriceFormProps>) => {
    switch (values.features) {
      case 'endingPrice':
        return (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <RInput
                name="endAmount"
                label="Ending price"
                type="number"
                defaultValue={0}
                onBlur={handleBlur}
                value={values.endAmount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <RInput
                label="Expiration date"
                type="datetime-local"
                name="expirationTime"
                onBlur={handleBlur}
                value={values.expirationTime ? moment(values.expirationTime).format('YYYY-MM-DDTHH:mm') : ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              {!!errors?.endAmount && !!touched.endAmount && <FormHelperText error>{errors.endAmount}</FormHelperText>}
              {!!errors?.expirationTime && !!touched.expirationTime && <FormHelperText error>{errors.expirationTime}</FormHelperText>}
            </Grid>
          </Grid>
        );
      case 'scheduleFutureTime':
        return (
          <RInput
            label="Expiration date"
            name="listingTime"
            type="datetime-local"
            value={values.listingTime ? moment(values.listingTime).format('YYYY-MM-DDTHH:mm') : ''}
            error={!!errors.listingTime && !!touched.listingTime}
            helperText={errors.listingTime}
            onChange={handleChange}
            fullWidth
          />
        );
      default:
        return <></>;
    }
  }, []);

  return (
    <Formik {...props} validationSchema={validateSchema}>
      {(props) => {
        const { values, errors, handleSubmit, touched, setFieldTouched, handleBlur, handleChange, setFieldValue } = props;
        return (
          <>
            <Box mt={5} display="flex" flexDirection="column" gap={2}>
              <RInput
                placeholder="Enter amount"
                label="Price *"
                type="number"
                name="startAmount"
                value={values.startAmount}
                error={!!errors.startAmount && !!touched.startAmount}
                helperText={errors.startAmount}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
              />
              {paymentTokens?.length && (
                <FormControl>
                  <Typography variant="caption" mb={1}>
                    Currency
                  </Typography>
                  <Select
                    fullWidth
                    onChange={(e) => {
                      setFieldValue('paymentTokenAddress', e.target.value);
                    }}
                    value={values.paymentTokenAddress}>
                    {paymentTokens.map((item, index) => (
                      <MenuItem value={item.address} key={index}>
                        {item.symbol}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <RInput
                label="Privacy"
                name="buyerAddress"
                placeholder="Buyer address, e.g. 0xf45a18..."
                value={values.buyerAddress}
                onChange={handleChange}
                fullWidth
              />
              <StyledFormControl>
                <RadioGroup
                  name="features"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.features}
                  row>
                  <FormControlLabel value="none" control={<Radio />} label="None" />
                  <FormControlLabel value="endingPrice" control={<Radio />} label="Include ending price" />
                  <FormControlLabel value="scheduleFutureTime" control={<Radio />} label="Schedule for a future time" />
                </RadioGroup>
              </StyledFormControl>
              {renderSubForm(props)}
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} mt={2}>
              <RButton
                disabled={status === RequestStatus.Loading}
                startIcon={status === RequestStatus.Loading && <CircularProgress size={15} />}
                height={5}
                color="primary"
                variant="contained"
                onClick={() => {
                  handleSubmit();
                  if (values.features === 'endingPrice') {
                    setFieldTouched('endAmount', true, true);
                    setFieldTouched('expirationTime', true, true);
                  }
                  if (values.features === 'scheduleFutureTime') {
                    setFieldTouched('listingTime', true, true);
                  }
                }}>
                Post your listing
              </RButton>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default RSetPriceForm;
