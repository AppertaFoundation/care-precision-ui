/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Grid,
  Divider,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogContentText,
  DialogActions,
  Typography,
} from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
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
} from '../selectors';

import { BottomBar, Button, Spinner } from 'components';
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
const breakpoints = createBreakpoints({});

const Dialog = withStyles({
  paper: {
    [breakpoints.up('sm')]: {
      borderRadius: '35px',
      padding: '15px',
    },
  },
})(MuiDialog);
const Response = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
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

  const [open, setOpen] = React.useState(false);

  const goToPatientList = () => navigate('/');
  const handleClose = () => setOpen(false);

  const goToOverview = () => navigate(`/overview${id}`);
  const handleSubmit = e => {
    dispatch(
      actions.pendingAssessment({
        situation: situation,
        background: background,
        news2: news2,
        sepsis: sepsis,
        covid: covid,
        denwis: denwis,
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
      {news2?.response && (
        <Grid item xs={12}>
          <News2Result />
          <Divider />
        </Grid>
      )}
      {sepsis?.response && (
        <Grid item xs={12}>
          <SepsisResult /> <Divider />
        </Grid>
      )}
      {denwis?.response && (
        <Grid item xs={12}>
          <DenwisResult /> <Divider />
        </Grid>
      )}
      {covid?.response && (
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
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        {pending ? (
          <Spinner />
        ) : (
          <>
            <DialogTitle>
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
            </DialogContent>
            <DialogActions>
              {success && (
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
              )}
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