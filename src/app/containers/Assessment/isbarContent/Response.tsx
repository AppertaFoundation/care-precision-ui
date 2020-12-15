/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectNews2Response,
  selectSepsis,
  selectDenwis,
  selectCovid,
} from '../selectors';

import { BottomBar, Button } from 'components';
import { News2Result } from './response/News2Result';
import { SepsisResult } from './response/SepsisResult';
import { DenwisResult } from './response/DenwisResult';
import { CovidResult } from './response/CovidResult';
import { ResponseActions } from './response/actions/ResponseActions';

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
  const navigate = useNavigate();

  const news2 = useSelector(selectNews2Response);
  const sepsis = useSelector(selectSepsis);
  const denwis = useSelector(selectDenwis);
  const covid = useSelector(selectCovid);

  const handleSubmit = e => {
    navigate('/');
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="row"
      className={classes.root}
    >
      {news2 && (
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
    </Grid>
  );
};
(Response as any).whyDidYouRender = {
  customName: 'Response',
};
export { Response };
