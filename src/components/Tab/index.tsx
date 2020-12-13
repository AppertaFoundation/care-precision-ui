import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';

interface StyledTabProps {
  label: string;
  disabled?: boolean;
}
export const Tab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#8187A0',
      border: '2px solid #ffff',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'none',
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        fontWeight: theme.typography.fontWeightBold,
        background: '#515F9C',
        color: '#ffff',
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <MuiTab disableRipple {...props} />);
