import React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import { ButtonPrimmary, ButtonSecondary, ButtonSuccess } from './styles';
import { Box } from '@material-ui/core';

interface IButton {
  width?: number;
  children: React.ReactNode;
  rest?: any;
}

const Success: React.FC<ButtonProps & IButton> = React.memo(
  ({ children, width, ...rest }) => {
    return (
      <Box width={width}>
        <ButtonSuccess size="small" {...rest}>
          {children}
        </ButtonSuccess>
      </Box>
    );
  },
);

const Primary: React.FC<ButtonProps & IButton> = React.memo(
  ({ children, width, ...rest }) => {
    return (
      <Box width={width}>
        <ButtonPrimmary size="small" {...rest}>
          {children}
        </ButtonPrimmary>
      </Box>
    );
  },
);

const Secondary: React.FC<ButtonProps & IButton> = React.memo(
  ({ children, width, ...rest }) => {
    return (
      <Box width={width}>
        <ButtonSecondary size="small" {...rest}>
          {children}
        </ButtonSecondary>
      </Box>
    );
  },
);

const Button = { Success, Primary, Secondary };
export default Button;
