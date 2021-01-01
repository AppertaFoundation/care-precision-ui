import React from 'react';
import {
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Box,
  ThemeProvider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from './style';
import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import BottomToolBar from './BottomTollBar';
import lightTheme from 'styles/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import clsx from 'clsx';
import LogoDark from './assets/LogoDark.png';

interface Props {
  header?: string;
  children: React.ReactNode;
  login?: boolean;
  bottomToolBar?: boolean;
}
const Layout: React.FC<Props> = ({
  header,
  children,
  login,

  bottomToolBar,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xsSM = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <div className={classes.root}>
        <CssBaseline />
        {header ? (
          <>
            <AppBar open={open}>
              <Toolbar>
                {!xsSM && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Box m={1}>
                  <img height={40} src={LogoDark} alt="Care Protect logo" />
                </Box>
                <Box ml={1}>
                  <Typography variant="h6" className={classes.title}>
                    {header}
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>

            <Drawer onClose={handleDrawerClose} open={open} />

            <main
              className={clsx(classes.content, classes.withDrawer, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              {children}
            </main>
            {bottomToolBar &&
              (xsSM ? (
                <BottomToolBar />
              ) : (
                <footer
                  className={clsx(classes.footer, {
                    [classes.contentShift]: open,
                  })}
                >
                  © 2020 Company. All rights reserved.
                </footer>
              ))}
          </>
        ) : (
          <>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              {children}
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};
export default Layout;
