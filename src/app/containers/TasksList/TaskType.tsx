import { Typography } from '@material-ui/core';
import React from 'react';

const COLORS = taskType =>
  ({
    Monitor: '#00ACC7',
    Management: '#ab47bc',
    'Internal Escalation': '#f9a825',
    'External Escalation': '#ff7043',
  }[taskType]);

const TaskType = ({ children }) => {
  return (
    <Typography style={{ color: COLORS(children) }}>
      {children.toUpperCase()}
    </Typography>
  );
};
export default TaskType;
