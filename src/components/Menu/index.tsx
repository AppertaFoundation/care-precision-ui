import React from 'react';
import MuiMenu from '@material-ui/core/Menu';
import { MenuProps } from '@material-ui/core';

type Props = {
  children: (React.ReactNode | React.ReactNode[])[];
  value: string;
};

const Menu = React.forwardRef<Props, MenuProps>((props, ref) => (
  <MuiMenu ref={ref} {...props} />
));

export default Menu;
