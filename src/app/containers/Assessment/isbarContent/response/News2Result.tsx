import React from 'react';
import { Box, Paper, Grid, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { News2Icon } from 'components';
import { useSelector } from 'react-redux';
import VitalSignsTable from './VitalSignsTable';
import { selectNews2Response, selectNews2 } from '../../selectors';

export const News2Result = () => {
  const news2Response = useSelector(selectNews2Response);
  const news2 = useSelector(selectNews2);
  const { totalScore, clinicalRiskCategory } = news2Response;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box p={1}>
      <Paper elevation={1} variant="outlined" square>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          {...(xs ? {} : { style: { height: '128px' } })}
        >
          <Grid item xs={12} sm={4} style={{ height: '100%' }}>
            <Box pl={1} pt={1} pb={1} style={{ height: '100%' }}>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="baseline"
                style={{ height: '100%' }}
              >
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="subtitle1">
                        <Box mr={1} fontWeight="fontWeightBold">
                          News2 Score:
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <News2Icon
                        news2={{
                          value: totalScore,
                          clinicalRisk: clinicalRiskCategory.code,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Last observation: 11:25 04 Aug 2020
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box {...(upSm ? { pr: 1 } : {})}>
              <VitalSignsTable
                flowRate={news2?.flowRate}
                news2={news2Response}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
