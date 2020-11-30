import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const DRAWER_WIDTH = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    selected: {
      color: '#3f51b5',
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
      backgroundColor: '#efefef',
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5,
    },
  }),
);
