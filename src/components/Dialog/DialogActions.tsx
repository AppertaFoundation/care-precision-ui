import React from 'react';
import { DialogActions as MuiDialogActions } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
const breakpoints = createBreakpoints({});

const Component = withStyles({
  root: {
    [breakpoints.down('md')]: {
      padding: '24px',
    },
  },
})(MuiDialogActions);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const DialogActions: React.FC<Props> = ({ children }) => (
  <Component>{children}</Component>
);

export { DialogActions };
