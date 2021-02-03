import React from 'react';
import { IconButton } from '@material-ui/core';
import { PopoverOrigin } from '@material-ui/core/Popover';
import SortIcon from '@material-ui/icons/Sort';
import Menu from '../Menu';

const POPER_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
};
interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'small';
}

const SortPoper: React.FC<Props> = ({ children, icon, size }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const buttonRef = React.useRef(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event?.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        ref={buttonRef}
        onClick={handleMenu}
        data-testid="sortPoper-button"
        {...(size ? { style: { padding: 0 } } : {})}
      >
        {icon || <SortIcon />}
      </IconButton>
      <Menu
        data-testid="menu-poper"
        anchorEl={anchorEl}
        anchorOrigin={POPER_ORIGIN}
        keepMounted
        transformOrigin={POPER_ORIGIN}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
};

export default SortPoper;
