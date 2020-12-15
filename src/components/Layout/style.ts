import {
  createStyles,
  Theme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const DRAWER_WIDTH = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      color: '#ffff',
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    // necessary for content to be below app bar
    toolbar: { height: 14 },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      color: '#00ACC7',
    },
    selected: {
      color: '#29375D',
    },
    closeIcon: {
      color: '#fff',
    },
    bottomRoot: {
      minWidth: 75,
    },
    wrapper: {
      position: 'fixed',
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100,
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5,
    },
  }),
);

export const MyBottomNavigationAction = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    '&.Mui-selected': {
      color: '#EE7402',
    },
  },
}))(BottomNavigationAction);
