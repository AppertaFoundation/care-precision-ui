import * as React from 'react';
import { useSelector } from 'react-redux';
import { useThemeSlice } from './slice';
import { selectTheme } from './slice/selectors';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();

  const theme = useSelector(selectTheme);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {React.Children.only(props.children)}
    </MuiThemeProvider>
  );
};
