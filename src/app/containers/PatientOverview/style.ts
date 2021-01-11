import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  closeButton: {
    marginRight: theme.spacing(2),
  },
  section: {
    backgroundColor: '#fff',
    border: '2px solid #fff',
    borderRadius: '35px',
    padding: '15px',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    height: 230,
    margin: theme.spacing(2),
  },

  subSection: {
    backgroundColor: '#fff',
    border: '2px solid #DADADA',
    borderRadius: '35px',
    padding: '15px',
  },
}));
