/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Grid,
  Divider,
  DialogContent,
  DialogContentText,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectNews2,
  selectSepsis,
  selectDenwis,
  selectCovid,
  selectBackground,
  selectSituation,
  selectSubmissionError,
  selectPending,
  selectSuccess,
  selectResult,
  selectResponse,
} from '../selectors';

import {
  BottomBar,
  Button,
  Spinner,
  Dialog,
  DialogTitle,
  DialogActions,
} from 'components';
import { News2Result } from './response/News2Result';
import { SepsisResult } from './response/SepsisResult';
import { DenwisResult } from './response/DenwisResult';
import { CovidResult } from './response/CovidResult';
import { ResponseActions } from './response/actions/ResponseActions';
import { useDispatch } from 'react-redux';
import { actions } from '../slice';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#ffff',
    color: 'black',
    border: '2px solid #DADADA',
    borderRadius: '0px 0px 15px 15px',
    marginBottom: '50px',
  },
}));

const Response = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const id = (params as any)?.id;
  const dispatch = useDispatch();
  const news2 = useSelector(selectNews2);
  const sepsis = useSelector(selectSepsis);
  const denwis = useSelector(selectDenwis);
  const covid = useSelector(selectCovid);
  const situation = useSelector(selectSituation);
  const background = useSelector(selectBackground);
  const success = useSelector(selectSuccess);
  const pending = useSelector(selectPending);
  const submissionError = useSelector(selectSubmissionError);
  const result = useSelector(selectResult);
  const response = useSelector(selectResponse);

  const [open, setOpen] = React.useState(false);
  const [noAction, setNoAction] = React.useState(false);

  const cleanStore = () => dispatch(actions.cleanAssessment());

  const handleClose = () => setOpen(false);
  const handleCloseNoAction = () => setNoAction(false);

  const navigate = path => history.push(path);
  const goToPatientList = () => {
    cleanStore();
    navigate('/');
  };
  const goToOverview = () => {
    navigate(`/patient-overview/${id}`);
    cleanStore();
  };
  const goToCovidManagement = () => {
    navigate(`/covid-menagment/${id}`);
    cleanStore();
  };
  const isEmpty = obj => !Object.values(obj).some(x => x !== null && x !== '');
  const handleSubmit = e => {
    if (isEmpty(response)) {
      return setNoAction(true);
    }
    dispatch(
      actions.pendingAssessment({
        situation: situation,
        background: background,
        news2: news2,
        sepsis: sepsis,
        covid: covid,
        denwis: denwis,
        result: result,
        response: response,
      }),
    );
    setOpen(true);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="row"
      className={classes.root}
    >
      {result?.news2?.totalScore && (
        <Grid item xs={12}>
          <News2Result />
          <Divider />
        </Grid>
      )}
      {result?.sepsis?.value && (
        <Grid item xs={12}>
          <SepsisResult /> <Divider />
        </Grid>
      )}
      {result?.denwis?.value && (
        <Grid item xs={12}>
          <DenwisResult /> <Divider />
        </Grid>
      )}
      {result?.covid?.value && (
        <Grid item xs={12}>
          <CovidResult /> <Divider />
        </Grid>
      )}

      <ResponseActions />
      <BottomBar>
        <Button.Secondary variant="contained" onClick={handleSubmit}>
          Finish and Save Observation
        </Button.Secondary>
      </BottomBar>
      {noAction && (
        <Dialog open={noAction} onClose={handleCloseNoAction}>
          <>
            <DialogTitle id="title" onClose={handleClose}>
              <Typography component="div" noWrap variant="h6">
                Your assessment is incomplete.
              </Typography>
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                You have to take Action (Intervention, Monitor, Futher
                Assessment or no Action Require)
              </DialogContentText>

              <Grid container spacing={3}>
                <Grid item>
                  <Button.Secondary
                    color="secondary"
                    variant="contained"
                    onClick={handleCloseNoAction}
                  >
                    OK
                  </Button.Secondary>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        </Dialog>
      )}
      <Dialog open={open} onClose={handleClose}>
        {pending ? (
          <Spinner />
        ) : (
          <>
            <DialogTitle id="title" onClose={handleClose}>
              <Typography component="div" noWrap variant="h6">
                {`${
                  success
                    ? 'The results were saved correctly'
                    : 'Something went wrong'
                }`}
              </Typography>
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                {`${
                  success ? 'Choose where you want to go now' : submissionError
                }`}
              </DialogContentText>
              {success ? (
                <Grid container spacing={2} direction="column">
                  {response.covidPathway ? (
                    <Grid item xs={12}>
                      <Button.Secondary
                        onClick={goToCovidManagement}
                        color="secondary"
                        variant="outlined"
                      >
                        COVID menagment
                      </Button.Secondary>
                    </Grid>
                  ) : (
                    <>
                      <Grid item xs={12}>
                        <Button.Secondary
                          onClick={goToPatientList}
                          color="secondary"
                          variant="outlined"
                        >
                          Patient List
                        </Button.Secondary>
                      </Grid>
                      <Grid item xs={12}>
                        <Button.Secondary
                          color="secondary"
                          onClick={goToOverview}
                          variant="outlined"
                        >
                          Patient Overview
                        </Button.Secondary>
                      </Grid>
                    </>
                  )}
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  <Grid item>
                    <Button.Secondary
                      color="secondary"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Try Again
                    </Button.Secondary>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              {/* {success && (
                <>
                  <Button.Secondary onClick={goToPatientList} color="secondary">
                    Patient List
                  </Button.Secondary>
                  <Button.Secondary color="secondary" onClick={goToOverview}>
                    Patient Overview
                  </Button.Secondary>
                </>
              )}
              {submissionError && (
                <Button.Secondary
                  color="secondary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Try Again
                </Button.Secondary>
              )} */}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Grid>
  );
};
(Response as any).whyDidYouRender = {
  customName: 'Response',
};
export { Response };
