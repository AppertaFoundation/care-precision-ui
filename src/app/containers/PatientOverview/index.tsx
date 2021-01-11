import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { sliceKey, reducer, actions } from './slice';
import { patientOverviewSaga } from './saga';

import {
  Spinner,
  AppBarSubpage,
  Card,
  CardContent,
  Carousel,
} from 'components';
import { IconButton, Box, Typography } from '@material-ui/core';
import { selectError, selectLoading, selectPatient } from './selectors';
import CloseIcon from '@material-ui/icons/Close';
import { SituationBackgroundSteps } from './Secitons/SituatiionBackground';
import { AssesmentOverview } from './Secitons/AssesmentOverview';
import { RecomendationsActions } from './Secitons/RecomendationsActions';
import { useStyles } from './style';

export function PatientOverview() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: patientOverviewSaga });

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const patient = useSelector(selectPatient);

  React.useEffect(() => {
    dispatch(actions.loadRecord(id));
  }, [dispatch, id]);

  const goBack = () => navigate('/');

  const situationBackgroundSteps = SituationBackgroundSteps();
  const assesmentOverview = AssesmentOverview({
    news2: { value: 4, clinicalRisk: 'at0057', trend: 'same' },
    denwis: {
      value: {
        trend: 'decreasing',
        value: 14,
      },
    },
    sepsis: {
      value: {
        value: 'amber',
      },
    },
    covid: {
      value: {
        date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
        suspected_covid_status: 'grey',
        covid_test_request: {
          date: '2020-11-10T22:39:31.826Z',
          value: 'EXAMPLE TEXT',
        },
      },
    },
  });
  const recomendationsActions = RecomendationsActions();

  if (isLoading) <Spinner />;

  if (error) <p>{error}</p>;

  return (
    <>
      <Helmet>
        <title>{`Patient Overview`}</title>
        <meta name="description" content={`Patient Overview`} />
      </Helmet>
      <AppBarSubpage header={`Patient Overview`}>
        <IconButton
          color="inherit"
          onClick={goBack}
          edge="start"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </AppBarSubpage>

      {patient && (
        <Box
          display="flex"
          flexWrap="nowrap"
          flexDirection="column"
          css={{ maxWidth: '100%' }}
        >
          <Box width="100%">
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

          <Box mt={1} mb={1} className={classes.section}>
            <Typography align="center" variant="subtitle1">
              <Box mr={1} fontWeight="fontWeightBold">
                Presenting Complaint & Background
              </Box>
            </Typography>
            <Carousel steps={situationBackgroundSteps} />
          </Box>

          <Box mt={1} mb={1} className={classes.section}>
            <Typography align="center" variant="subtitle1">
              <Box mr={1} fontWeight="fontWeightBold">
                Assessment Overview{' '}
              </Box>
            </Typography>
            <Carousel steps={assesmentOverview} />
          </Box>

          <Box mt={1} mb={1} className={classes.section}>
            <Typography align="center" variant="subtitle1">
              <Box mr={1} fontWeight="fontWeightBold">
                Recomendations & Actions
              </Box>
            </Typography>
            <Carousel steps={recomendationsActions} />
          </Box>
        </Box>
      )}
    </>
  );
}
