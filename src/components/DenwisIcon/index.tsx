import React from 'react';
import { Box } from '@material-ui/core';
import TrendArrow from '../TrendArrow';
import { useStyles } from './style';

const DenwisIcon = ({ denwis }) => {
  const { value, trend } = denwis;
  const color = value === 0 ? 'grey' : value > 4 ? 'red' : 'green';
  const classes = useStyles(color);
  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="center"
      >
        {trend && (
          <Box style={{ zIndex: 2 }} width={1 / 3}>
            <TrendArrow trend={trend} />
          </Box>
        )}
        <div style={classes.root}>
          <div style={classes.inside}>{value}</div>
        </div>
      </Box>
    </div>
  );
};

export default DenwisIcon;
