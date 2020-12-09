/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { assessmentTypeSelector } from 'store/assessmentTypeReducer';

import { assessmentEventSaga } from './saga';
import { sliceKey, reducer, actions } from './slice';
import { useParams } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import { Box, Divider } from '@material-ui/core';
import { useStyles } from './style';

import { Card, CardContent, AppBar } from 'components';
import ISBR from './ISBR';

export function Assessment() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: assessmentEventSaga });
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const ref = React.useRef(null);

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);
  const assessmentType = useSelector(assessmentTypeSelector);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadRecord(id));
  });

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  const header = assessmentType.toUpperCase();

  return (
    <>
      <Helmet>
        <title>{`Observation- ${header}`}</title>
        <meta name="description" content={`A Observation Event- ${header}`} />
      </Helmet>

      <div className={classes.fixed} ref={ref}>
        <AppBar
          header={`Observation- ${header}`}
          xsSM={true}
          withBottomBar={true}
        />
        <Box mr={1} ml={1}>
          <Card
            name={patient?.name}
            identifier={patient?.nhsnumber}
            assesments={patient?.assessment}
            id={patient?.id}
          >
            <CardContent
              birthDate={patient?.birthDate}
              gender={patient?.gender}
              location={patient?.location}
            />
          </Card>
        </Box>
      </div>
      <Box className={classes.root}>
        <Divider />
        <ISBR />
      </Box>
    </>
  );
}
