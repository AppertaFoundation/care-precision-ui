import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
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
});
interface Props {
  children: React.ReactNode;
}
const BottomBar: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Grid container direction="column" justify="center" alignItems="center">
        {children}
      </Grid>
    </div>
  );
};

export { BottomBar };
