import { withStyles, Theme } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

export const ButtonSuccess = withStyles(() => ({
  root: { borderRadius: '35px' },
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
    backgroundColor: '#EE7402',
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: '#e94e1b',
      boxShadow: 'none',
      color: '#00000',
    },
    '&:active': {
      backgroundColor: '#e94e1b',
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
    borderRadius: '35px',
  },
}))(MuiButton);

export const ButtonPrimmary = withStyles((theme: Theme) => ({
  root: {
    borderRadius: '35px',
  },
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
