import React from 'react';
import { Box } from '@material-ui/core';
import TrendArrow from '../TrendArrow';
import { useStyles } from './style';

export const mapCircleColors = (score: string): string => {
  return {
    at0060: '#F40013',
    at0059: '#FBC384',
    at0058: '#fbf184',
    at0057: '#2E7D32',
  }[score];
};

const mapScoreColors = clinicalRisk =>
  clinicalRisk === 'at0060' || clinicalRisk === 'at0057' ? '#fff' : '#000';

const News2Icon: React.FC<{
  news2: {
    value: number;
    clinicalRisk: string;
    trend?: string;
  };
}> = ({ news2 }) => {
  const { value, clinicalRisk, trend } = news2;
  const circleColor = mapCircleColors(clinicalRisk || '');
  const scoreColor = mapScoreColors(clinicalRisk || '');
  const double = news2.value.toString().length === 2;
  const classes = useStyles(circleColor, scoreColor, double);
  return (
    <div style={classes.root}>
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
        <Box>
          <span style={classes.outside}>
            <span style={classes.inside}>{value}</span>
          </span>
        </Box>
      </Box>
    </div>
  );
};

export default News2Icon;
