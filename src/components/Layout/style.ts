import {
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarHeight: {
      height: 65,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: '16px 8px',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: '100%',
      minHeight: 'calc(100vh - 52px)',
    },
    withDrawer: {
      // marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 240,
    },
    title: {
      flexGrow: 1,
      color: '#00ACC7',
    },
    selected: {
      color: '#29375D',
    },
    // root: {
    //   display: 'flex',
    //   color: '#ffff',
    // },
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
    footer: {
      backgroundColor: '#001031',
      color: theme.palette.primary.contrastText,
      padding: '16px 24px',
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
