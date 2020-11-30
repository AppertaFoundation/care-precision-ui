import React from 'react';
import {
  Toolbar,
  IconButton,
  Typography,
  AppBar as MuiAppBar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import { makeStyles } from '@material-ui/core/styles';

const useAppBarStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
  },
});

interface Props {
  header: string;
  xsSM: boolean;
  withBottomBar: boolean;
}
const AppBar: React.FC<Props> = ({ header, withBottomBar, xsSM }) => {
  const classes = useStyles();
  const appBar = useAppBarStyles();
  const navigate = useNavigate();
  const goBack = e => navigate(-1);
  return (
    <MuiAppBar
      position="fixed"
      {...(xsSM || !withBottomBar ? {} : { className: appBar.appBar })}
    >
      <Toolbar>
        {!withBottomBar && (
          <IconButton className={classes.closeIcon} onClick={goBack}>
            <CloseIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {header}
        </Typography>
        {/* // <User /> */}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
