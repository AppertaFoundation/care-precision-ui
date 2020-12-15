import React from 'react';
import {
  Toolbar,
  Typography,
  AppBar as MuiAppBar,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogContentText,
  Box,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'components';
import LogoDark from './assets/LogoDark.png';
// import FullLogo from './assets/FullLogo.png';

const useAppBarStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    height: 64,
  },
  height: { height: 64 },
});

interface Props {
  header: string;
  xsSM: boolean;
  withBottomBar: boolean;
  notSubmitedData?: boolean;
  cleanFunction?: any;
}
const AppBar: React.FC<Props> = ({
  header,
  withBottomBar,
  xsSM,
  notSubmitedData,
  cleanFunction,
}) => {
  const classes = useStyles();
  const appBar = useAppBarStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = e => setOpen(false);
  // const goBack = e => {
  //   if (notSubmitedData) {
  //     setOpen(true);
  //   }
  // };
  const exit = e => {
    cleanFunction();
    navigate('/');
  };

  return (
    <>
      <MuiAppBar
        position="fixed"
        {...(xsSM || !withBottomBar
          ? { className: appBar.height }
          : { className: appBar.appBar })}
      >
        <Toolbar>
          {/* {!withBottomBar && (
            <IconButton className={classes.closeIcon} onClick={goBack}>
              <CloseIcon />
            </IconButton>
          )} */}
          <Box m={1}>
            <img height={40} src={LogoDark} alt="Care Protect logo" />
          </Box>
          <Box ml={1}>
            <Typography variant="h6" className={classes.title}>
              {header}
            </Typography>
          </Box>

          {/* // <User /> */}
        </Toolbar>
      </MuiAppBar>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography align="left">Are you sure?</Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            You have not submitted the form, if you now leave the page you will
            lose your entries.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item>
              <Button.Secondary onClick={handleClose}>Cancel</Button.Secondary>
            </Grid>
            <Grid item>
              <Button.Secondary variant="contained" onClick={exit}>
                Leave and lost entries
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppBar;
