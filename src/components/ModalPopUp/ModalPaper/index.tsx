import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { IMedia, MediaContext } from '../../../common/context/mediaContext';

const useMenuStyles = makeStyles((theme) => ({
  paper: (props: IMedia) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.xsSmallScreen ? 350 : 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid ' + theme.palette.primary.main,
    '&:focus': {
      outline: 'none',
    },
  }),
}));

interface ModalPaperProps {
  children: React.ReactNode;
}

const ModalPaper: React.FC<ModalPaperProps> = ({ children }) => {
  const media = useContext(MediaContext);
  const classes = useMenuStyles(media);
  return <div className={classes.paper}>{children}</div>;
};

export default ModalPaper;
