import React from 'react';
import { useStyles } from './style';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewListIcon from '@material-ui/icons/ViewList';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

interface Props {
  login?: boolean;
}
const SideDrawer: React.FC<Props> = ({ login }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [navPath, setNavPath] = React.useState(pathname);

  const handleChange = e => {
    navigate(e.currentTarget.id, { replace: true });
    setNavPath(pathname);
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div {...(login ? {} : { className: classes.toolbar })} />
      <Divider />
      <List>
        <ListItem button key={'/'} id={'/'} onClick={handleChange}>
          <ListItemIcon
            className={navPath === '/' ? classes.selected : undefined}
          >
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText
            className={navPath === '/' ? classes.selected : undefined}
            primary={'Patients'}
          />
        </ListItem>
        <ListItem
          button
          key={'/dashboard'}
          id={'/dashboard'}
          // selected={navPath === '/dashboard'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/dashboard' ? classes.selected : undefined}
          >
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText
            className={navPath === '/dashboard' ? classes.selected : undefined}
            primary={'Acuity Dashboard'}
          />
        </ListItem>
        <ListItem
          button
          key={'/tasks'}
          selected={navPath === '/tasks'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/tasks' ? classes.selected : undefined}
          >
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Tasks'}
            className={navPath === '/tasks' ? classes.selected : undefined}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={'/admin'}
          id="/admin"
          selected={navPath === '/admin'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/admin' ? classes.selected : undefined}
          >
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Admin'}
            className={navPath === '/admin' ? classes.selected : undefined}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
