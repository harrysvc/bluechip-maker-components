import RModal, { RModalProps } from '@components/Modal';
import RMakeOfferForm, { RMakeOfferFormProps } from '@container/Form/MakeOfferForm';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export type RMakeOfferModalProps = {
  handleSubmit?: (values: RMakeOfferFormProps) => void;
} & Omit<RModalProps, 'children'>;

const RMakeOfferModal = ({ handleSubmit, ...props }: RMakeOfferModalProps) => {
  const { data } = useSelector((state) => state.nft.detail);

  const initialValues: RMakeOfferFormProps = {
    startAmount: 1,
    date: new Date(),
    paymentTokenAddress: data?.collection.payment_tokens?.[0].address || '',
  };

  return (
    <RModal {...props} width={550}>
      <Box my={2}>
        <Typography variant="h4">Make Offer</Typography>
      </Box>
      <RMakeOfferForm
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit?.(values);
        }}
      />
    </RModal>
  );
};

export default RMakeOfferModal;
