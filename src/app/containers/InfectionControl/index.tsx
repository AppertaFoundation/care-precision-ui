/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { infectionControlSaga } from './saga';
import { sliceKey, reducer, actions } from './slice';
import { useParams } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from './style';

import { Card, CardContent, AppBar } from 'components';
import { CovidStatus } from './CovidStatus';
import { TestStatus } from './TestStatus';
import { IsolationStatus } from './IsolationStatus';

export function InfectionControl() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: infectionControlSaga });
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const ref = React.useRef(null);

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadRecord(id));
  });

  const include = (assessmentsTypesArray: Array<string>, key: string) =>
    assessmentsTypesArray.includes(key);

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <>
      <Helmet>
        <title>{`Patient Covid Status`}</title>
        <meta name="description" content={`Patient Covid Status`} />
      </Helmet>

      <div className={classes.fixed} ref={ref}>
        <AppBar
          header={`Patient Covid Status`}
          xsSM={true}
          withBottomBar={true}
        />
        {patient && (
          <Box mr={1} ml={1}>
            <Card
              name={patient?.name || ''}
              identifier={patient?.nhsnumber || ''}
              assesments={patient?.assessment}
              id={patient?.id || ''}
            >
              <CardContent
                birthDate={patient?.birthDate || ''}
                gender={patient?.gender || ''}
                location={patient?.location || ''}
              />
            </Card>
          </Box>
        )}
      </div>
      <Box className={classes.root}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Box p={1} width="100%">
            <Paper elevation={1} variant="outlined" square>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                direction="row"
              >
                <Grid xs={12} sm={4} item>
                  <CovidStatus />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TestStatus />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <IsolationStatus />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>

        <Grid container justify="center" alignItems="center" direction="column">
          <Box p={1} width="100%">
            <Paper elevation={1} variant="outlined" square>
              <Box m={1} p={1}>
                <Typography variant="h6">COVID Status History</Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
