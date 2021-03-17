import { Typography } from '@material-ui/core';
import React from 'react';

const COLORS = taskType =>
  ({
    Monitor: '#00ACC7',
    Management: '#ab47bc',
    'Internal Escalation': '#f9a825',
    'External Escalation': '#ff7043',
  }[taskType]);

const Task = ({ children, taskType }) => {
  return (
    <Typography style={{ color: COLORS(taskType) }}>{children}</Typography>
  );
};
export default Task;
