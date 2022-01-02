import RButton from '@components/Button';
import RInput from '@components/Input';
import { Box, CircularProgress, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { OpenSeaFungibleToken } from '@typings/marketplace/opensea';
import { RequestStatus } from '@typings/request';
import { Formik, FormikConfig } from 'formik';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

export type RHighestBidFormProps = {
  startAmount: number;
  englishAuctionReservePrice: number;
  paymentTokenAddress?: string;
  expirationTime?: Date;
  waitForHighestBid?: boolean;
};

const RHighestBidForm = ({ paymentTokens, ...props }: FormikConfig<RHighestBidFormProps> & { paymentTokens: OpenSeaFungibleToken[] }) => {
  const { status } = useSelector((state) => state.nft.sell);

  const validateSchema = Yup.object().shape({
    startAmount: Yup.number().moreThan(0, 'Price must be larger than 0').required('Please provide a starting price'),
    englishAuctionReservePrice: Yup.number().min(1, 'Reserve price must be larger than 1').required('Please provide a reserve price'),
    expirationTime: Yup.string().required('Please provide a expiration date'),
  });

  return (
    <Formik {...props} validationSchema={validateSchema}>
      {({ values, handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched }) => {
        return (
          <>
            <Box mt={5} display="flex" flexDirection="column" gap={2}>
              <RInput
                label="Minimum bid*"
                type="number"
                name="startAmount"
                value={values.startAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={!!errors.startAmount && !!touched.startAmount}
                helperText={errors.startAmount}
              />
              <RInput
                label="Reserve price*"
                type="number"
                name="englishAuctionReservePrice"
                value={values.englishAuctionReservePrice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.englishAuctionReservePrice && !!touched.englishAuctionReservePrice}
                helperText={errors.englishAuctionReservePrice}
                fullWidth
              />
              {paymentTokens?.length && (
                <FormControl>
                  <Typography variant="caption" mb={1}>
                    Currency
                  </Typography>
                  <Select
                    fullWidth
                    id="currency"
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
                label="Expiration date"
                name="expirationTime"
                type="datetime-local"
                value={values.expirationTime ? moment(values.expirationTime).format('YYYY-MM-DDThh:mm') : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.expirationTime && !!touched.expirationTime}
                helperText={errors.expirationTime}
                fullWidth
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} mt={2}>
              <RButton
                disabled={status === RequestStatus.Loading}
                startIcon={status === RequestStatus.Loading && <CircularProgress size={15} />}
                height={5}
                color="primary"
                variant="contained"
                onClick={() => handleSubmit()}>
                Post your listing
              </RButton>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default RHighestBidForm;
