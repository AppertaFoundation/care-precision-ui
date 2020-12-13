import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialog, { DialogProps } from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, WithStyles } from '@material-ui/core';

const dialogTitleStyle = ({ spacing }: Theme) => ({
  root: {
    margin: 0,
    padding: spacing(1),
  },
});

interface DialogTitleProps extends WithStyles<typeof dialogTitleStyle> {
  title: string;
  onClose: () => void;
  close?: boolean;
}

const DialogTitle = withStyles(dialogTitleStyle)(
  ({ title, onClose, close, classes }: DialogTitleProps) => (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="center"
        alignContent="center"
        spacing={2}
      >
        <Grid item>
          {close && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item>
          <Typography align="center" variant="h6">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </MuiDialogTitle>
  ),
);

const dialogSubtitleStyle = ({ spacing }: Theme) => ({
  subtitle: {
    margin: 0,
    paddingTop: 0,
    paddingLeft: spacing(4),
  },
  subtitleContent: {
    paddingRight: '70px',
  },
});

interface DialogSubtiltProps extends WithStyles<typeof dialogSubtitleStyle> {
  children: string | JSX.Element;
}

const DialogSubtitle = withStyles(dialogSubtitleStyle)(
  ({ children, classes }: DialogSubtiltProps) => (
    <MuiDialogTitle disableTypography className={classes.subtitle}>
      <Typography className={classes.subtitleContent} variant="h6">
        {children}
      </Typography>
    </MuiDialogTitle>
  ),
);

const DialogContent = withStyles({
  root: {
    // overflow: 'scroll',
    padding: 0,
  },
})(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))(MuiDialogActions);

type DialogExtendedProps = DialogProps & {
  title?: string;
  subtitle?: string | JSX.Element;
  open: boolean;
  close?: boolean;
  fullScreen?: boolean;
  openAction?: JSX.Element;
  bottomActions?: JSX.Element;
  handleClose: () => void;
  children: JSX.Element;
  maxWidth?: string;
  fullWidth?: boolean;
};
const Dialog: React.FC<DialogExtendedProps> = ({
  title,
  subtitle,
  close,
  children,
  open,
  openAction,
  bottomActions,
  fullScreen,
  handleClose,
  maxWidth,
  fullWidth,
}) => {
  return (
    <>
      {openAction}
      <MuiDialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      >
        {title && (
          <DialogTitle close={close} title={title} onClose={handleClose} />
        )}
        {subtitle && <DialogSubtitle>{subtitle}</DialogSubtitle>}
        <DialogContent>{children}</DialogContent>
        <DialogActions>{bottomActions}</DialogActions>
      </MuiDialog>
    </>
  );
};

export default Dialog;
