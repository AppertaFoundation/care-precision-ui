/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  assessmentTypeSelector,
  assessmentsTypesArraySelector,
  setAssessmentType,
} from 'store/assessmentTypeReducer';

import { assessmentEventSaga } from './saga';
import { sliceKey, reducer, actions } from './slice';
import { useParams } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import { Box } from '@material-ui/core';
import { useStyles } from './style';

import { Card, CardContent, AppBar, Spinner } from 'components';
import ISBR from './ISBR';

export function Assessment() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: assessmentEventSaga });
  const dispatch = useDispatch();
  const { id, obsType } = useParams();
  const classes = useStyles();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);
  const assessmentType = useSelector(assessmentTypeSelector) || obsType;
  const assessmentsTypesArray: [] = useSelector(assessmentsTypesArraySelector);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadRecord(id));
    updateAssessmentsTypesArray();
  });

  const updateAssessmentsTypesArray = () => {
    if (!include(assessmentsTypesArray, assessmentType)) {
      dispatch(setAssessmentType(assessmentType));
    }
  };

  const include = (assessmentsTypesArray: Array<string>, key: string) =>
    assessmentsTypesArray.includes(key);

  const cleanStore = e => {
    dispatch(actions.cleanAssessment());
  };
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
  const header = assessmentType.toUpperCase();
  return (
    <>
      <Helmet>
        <title>{`Assessment- ${header}`}</title>
        <meta name="description" content={`A Assessment Event- ${header}`} />
      </Helmet>

      <AppBar
        header={`Assessment: ${header}`}
        xsSM={true}
        withBottomBar={false}
        notSubmitedData={true}
        cleanFunction={cleanStore}
      />
      <Box mr={1} ml={1} style={{ marginTop: '70px' }}>
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
      <Box className={classes.root}>
        <ISBR />
      </Box>
    </>
  );
}
