/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import {
  useSelector,
  // , useDispatch
} from 'react-redux';
// import { actions } from '../slice';
import {
  selectNews2Response,
  selectSepsis,
  selectDenwis,
  selectCovid,
  // selectResponseActions,
  // selectSituation,
  // selectBackground,
} from '../selectors';

import { BottomBar, Button } from 'components';
import { News2Result } from './response/News2Result';
import { SepsisResult } from './response/SepsisResult';
import { DenwisResult } from './response/DenwisResult';
import { CovidResult } from './response/CovidResult';
import { ResponseActions } from './response/actions/ResponseActions';

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     minWidth: '300px',
//     margin: '0 auto',
//   },
// }));

const Response = () => {
  // const classess = useStyles();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const news2 = useSelector(selectNews2Response);
  const sepsis = useSelector(selectSepsis);
  const denwis = useSelector(selectDenwis);
  const covid = useSelector(selectCovid);
  // const responseActions = useSelector(selectResponseActions);
  // const situation = useSelector(selectSituation);
  // const background = useSelector(selectBackground);

  const handleSubmit = e => {
    navigate('/');
  };
  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid item xs={12}>
        {news2 && <News2Result />}
        {sepsis?.response && <SepsisResult />}
        {denwis?.response && <DenwisResult />}
        {covid?.response && <CovidResult />}
      </Grid>
      <ResponseActions />
      <BottomBar>
        <Button.Success variant="contained" onClick={handleSubmit}>
          Finish and Save Observation
        </Button.Success>
      </BottomBar>
    </Grid>
  );
};
(Response as any).whyDidYouRender = {
  customName: 'Response',
};
export { Response };
