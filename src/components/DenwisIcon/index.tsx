import React from 'react';
import { Box } from '@material-ui/core';
import TrendArrow from '../TrendArrow';
import { useStyles } from './style';

const DenwisIcon = ({ denwis }) => {
  const color =
    denwis?.value === 0 ? 'grey' : denwis?.value > 4 ? 'red' : 'green';
  const classes = useStyles(color);
  return (
    <div style={{ width: 51 }}>
      <Box
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="center"
      >
        {denwis?.trend && (
          <Box style={{ zIndex: 2 }} width={1 / 3}>
            <TrendArrow trend={denwis?.trend} />
          </Box>
        )}
        <div style={classes.root}>
          <div style={classes.inside}>{denwis?.value}</div>
        </div>
      </Box>
    </div>
  );
};

export default DenwisIcon;
