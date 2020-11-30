import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewListIcon from '@material-ui/icons/ViewList';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useStyles } from './style';

const BottomToolBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleChange = (e, value) => {
    navigate(value, { replace: true });
  };
  return (
    <div className={classes.wrapper}>
      <BottomNavigation value={pathname} showLabels onChange={handleChange}>
        <BottomNavigationAction
          className={classes.root}
          label="Patients"
          value="/"
          icon={<AssignmentIndIcon />}
        />
        <BottomNavigationAction
          className={classes.root}
          label="Acuity Dashboard"
          value="/dashboard"
          icon={<ViewListIcon />}
        />
        <BottomNavigationAction
          className={classes.root}
          label="Tasks"
          value="/tasks"
          icon={<AssignmentIcon />}
          disabled
        />
        <BottomNavigationAction
          className={classes.root}
          label="Admin"
          value="/admin"
          icon={<SupervisorAccountIcon />}
          disabled
        />
      </BottomNavigation>
    </div>
  );
};
export default BottomToolBar;
