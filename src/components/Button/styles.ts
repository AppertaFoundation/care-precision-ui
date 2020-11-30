import { createStyles } from '@material-ui/core/styles';

export const success = () =>
  createStyles({
    contained: {
      minWidth: '100%',
      backgroundColor: '#397F3A',
      textTransform: 'none',
      color: '#fff',
    },
  });
export const primary = () =>
  createStyles({
    contained: {
      minWidth: '100%',
      textTransform: 'none',
      backgroundColor: '#fff',
      color: '#000',
    },
    outlined: {
      minWidth: '100%',
      textTransform: 'none',
    },
  });

export const secondary = () =>
  createStyles({
    contained: {
      minWidth: '100%',
      backgroundColor: '#4B6171',
      color: '#fff',
    },
    root: {
      minWidth: '100%',
      textTransform: 'none',
    },
  });
