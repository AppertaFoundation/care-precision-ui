import { withStyles, Theme } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

export const ButtonSuccess = withStyles(() => ({
  contained: {
    minWidth: '100%',
    backgroundColor: '#397F3A',
    textTransform: 'none',
    color: '#fff',
  },
}))(MuiButton);

export const ButtonSecondary = withStyles((theme: Theme) => ({
  contained: {
    minWidth: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: 'none',
      color: '#00000',
    },
    '&:active': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: 'none',
      color: '#00000',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      color: '#00000',
    },
  },
  root: {
    minWidth: '100%',
  },
}))(MuiButton);

export const ButtonPrimmary = withStyles((theme: Theme) => ({
  contained: {
    minWidth: '100%',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  outlined: {
    minWidth: '100%',
    color: theme.palette.primary.main,
  },
}))(MuiButton);
