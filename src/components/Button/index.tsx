import React from 'react';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { success, primary, secondary } from './styles';
import { Box } from '@material-ui/core';

interface Props extends ButtonProps {
  children: React.ReactNode | string;
  width?: number;
}

const Success = withStyles(success)(
  ({ children, classes, width, ...rest }: Props) => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    return (
      <Box width={200}>
        <MuiButton {...(xs ? { size: 'small' } : {})} {...rest}>
          {children}
        </MuiButton>
      </Box>
    );
  },
);

const Primary = withStyles(primary)(
  ({ children, classes, width, ...rest }: Props) => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    return (
      <Box width={width}>
        <MuiButton {...(xs ? { size: 'small' } : {})} {...rest}>
          {children}
        </MuiButton>
      </Box>
    );
  },
);
const Secondary = withStyles(secondary)(
  ({ children, classes, width, ...rest }: Props) => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    return (
      <Box width={width}>
        <MuiButton {...(xs ? { size: 'small' } : {})} {...rest}>
          {children}
        </MuiButton>
      </Box>
    );
  },
);
const Button = { Success, Primary, Secondary };
export default Button;
