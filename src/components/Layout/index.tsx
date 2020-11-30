import React from 'react';
import { useStyles } from './style';
import { ThemeProvider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import AppBar from './AppBar';
import SideDrawer from './SideDrawer';
import BottomToolBar from './BottomTollBar';
import theme from 'styles/theme';

interface Props {
  children: React.ReactNode;
  login?: boolean;
  header?: string;
  bottomToolBar?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  login,
  header,
  bottomToolBar,
}) => {
  const classes = useStyles();
  const muiTheme = useTheme();
  const xsSM = useMediaQuery(muiTheme.breakpoints?.between('xs', 'sm'));

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {header && (
          <AppBar
            header={header}
            xsSM={xsSM}
            withBottomBar={Boolean(bottomToolBar)}
          />
        )}
        <CssBaseline />

        {bottomToolBar && !xsSM && <SideDrawer login={login} />}
        {bottomToolBar && xsSM && <BottomToolBar />}
        <main className={classes.content}>
          {!login && <div className={classes.toolbar} />}
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
