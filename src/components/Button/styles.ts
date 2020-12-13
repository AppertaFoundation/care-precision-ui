import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

export const ButtonSuccess = withStyles(() => ({
  contained: {
    minWidth: '100%',
    backgroundColor: '#397F3A',
    textTransform: 'none',
    color: '#fff',
  },
}))(MuiButton);

export const ButtonSecondary = withStyles(() => ({
  contained: {
    minWidth: '100%',
    backgroundColor: '#4B6171',
    color: '#fff',
  },
  root: {
    minWidth: '100%',
    textTransform: 'none',
  },
}))(MuiButton);

export const ButtonPrimmary = withStyles(() => ({
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
}))(MuiButton);
