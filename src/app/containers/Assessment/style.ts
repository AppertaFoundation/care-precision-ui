import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  root: {},
  chip: {
    minWidth: '300px',
    margin: '0 auto',
  },
  fixed: {
    width: '100%',
    height: '128px',
    zIndex: 500,
    position: 'fixed',
    top: 65,
    left: 0,
  },
  santizedGrid: {
    minWidth: '100%',
  },
}));
