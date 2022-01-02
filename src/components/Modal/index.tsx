import { Backdrop, Fade, Modal, ModalProps, Box, IconButton, CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react';
import { ModalWrapper } from './Modal.styled';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '@theme';

export type RModalProps = Omit<ModalProps, 'children'> & { children: ReactNode; width?: number; isLoading?: boolean };

const RModal = ({ className, width = 400, isLoading = false, ...props }: RModalProps) => {
  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...props}>
      <Fade in={props.open}>
        <ModalWrapper className={className} width={width}>
          {isLoading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#0008"
              zIndex="10">
              <CircularProgress />
            </Box>
          )}
          <Box position="absolute" top={20} right={20}>
            <IconButton
              onClick={() => {
                props.onClose?.({}, 'backdropClick');
              }}>
              <CloseIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>
          </Box>
          <Box>{props.children}</Box>
        </ModalWrapper>
      </Fade>
    </Modal>
  );
};

export default RModal;
