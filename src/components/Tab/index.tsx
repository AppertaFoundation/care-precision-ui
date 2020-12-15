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
      background: theme.palette.primary.light,
      // border: '2px solid #ffff',
      marginTop: theme.spacing(2),
      marginBottom: 0,
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'none',
      borderTop: '2px solid #DADADA',
      borderRadius: '15px 15px 0px 0px',
      '&:hover': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        // color: '#40a9ff',
        // opacity: 1,
      },
      '&$selected': {
        fontWeight: theme.typography.fontWeightBold,
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      '&:focus': {
        fontWeight: theme.typography.fontWeightBold,
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',

        // color: '#40a9ff',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <MuiTab disableRipple {...props} />);
