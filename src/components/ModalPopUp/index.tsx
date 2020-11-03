import React from 'react';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useModalClasses = makeStyles((theme) => ({
  root: {},
}));

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
}

const ModalPopUp: React.FC<ModalProps> = ({ children, open, onClose }) => {
  const classes = useModalClasses();

  return (
    <Modal className={classes.root} open={open} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ModalPopUp;
