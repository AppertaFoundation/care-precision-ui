import React from 'react';
import { AppBar } from '../AppBar';
import { Toolbar, Typography, Box } from '@material-ui/core';
import LogoDark from '../assets/LogoDark.png';
import { useStyles } from '../style';

interface Props {
  header: string;
  children?: React.ReactNode;
}
export const AppBarSubpage: React.FC<Props> = ({ header, children }) => {
  const classes = useStyles({});
  return (
    <AppBar open={false}>
      <Toolbar>
        {children}
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
  );
};
