import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { IMedia, MediaContext } from '../../common/context/mediaContext';

const usePaperLayoutStyles = makeStyles(() => ({
  paper: (media: IMedia) => ({
    padding: 10,
    position: 'relative',
    marginTop: media.xsSmallScreen ? 0 : 25,
    height: media.xsSmallScreen ? '100%' : '70%',
    borderRadius: 15,
    boxShadow: ' 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
  }),
}));

interface PaperProps {
  children: React.ReactNode;
  styles?: {};
}

const PaperLayout: React.FC<PaperProps> = ({ children, styles }) => {
  const media = useContext(MediaContext);
  const classes = usePaperLayoutStyles(media);

  return (
    <Paper className={classes.paper} style={{ ...styles }} elevation={2}>
      {children}
    </Paper>
  );
};

export default PaperLayout;
