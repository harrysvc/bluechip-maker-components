import RButton from '@components/Button';
import RInput from '@components/Input';
import { LINK_OPENSEA_SWAP } from '@constant/variables';
import { Box, CircularProgress } from '@mui/material';
import { RequestStatus } from '@typings/request';
import { Formik, FormikConfig } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

export type RBidItemFormProps = {
  bidPrice: number;
  expirationDate: Date;
};

const RBidItemForm = ({ currentBidPrice, ...props }: FormikConfig<RBidItemFormProps> & { currentBidPrice: number }) => {
  const formSchema = Yup.object().shape({
    bidPrice: Yup.number().moreThan(currentBidPrice, 'Price must be larger than current bid price ').required('Please enter your bid price'),
    expirationDate: Yup.string().required('Please provide a expiration date'),
  });

  const { status } = useSelector((state) => state.nft.bid);
  const { data } = useSelector((state) => state.nft.detail);

  return (
    <Formik {...props} validationSchema={formSchema}>
      {({ isValid, values, handleSubmit, handleChange, handleBlur, errors, touched }) => {
        return (
          <>
            <Box mt={5} display="flex" flexDirection="column" gap={2}>
              <RInput
                type="number"
                value={values.bidPrice}
                name="bidPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={!!errors.bidPrice && !!touched.bidPrice}
                helperText={errors.bidPrice}
              />
              <RInput
                type="datetime-local"
                value={values.expirationDate ? moment(values.expirationDate).format('YYYY-MM-DDThh:mm') : ''}
                name="expirationDate"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.expirationDate && !!touched.expirationDate}
                helperText={errors.expirationDate}
                fullWidth
              />
              <RButton
                height={5.5}
                disabled={status === RequestStatus.Loading || !isValid}
                startIcon={status === RequestStatus.Loading && <CircularProgress size={15} />}
                color="primary"
                variant="contained"
                onClick={() => handleSubmit()}>
                {isValid && 'Place Bid '}
                {!isValid && 'Not Enough'}
              </RButton>
              <RButton
                height={5.5}
                disabled={status === RequestStatus.Loading}
                color="secondary"
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

export default RBidItemForm;
