/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Chip,
  Box,
  Grid,
  FormLabel,
  Paper,
  Typography,
  TextField,
  InputLabel,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slice';
import {
  selectNews2Response,
  selectSepsis,
  selectDenwis,
  selectCovid,
} from '../selectors';
import { ErrorMsg } from 'components';
import uniqid from 'uniqid';
import { BottomBar, Button } from 'components';
import { News2Result } from './response/News2Result';
import { SepsisResult } from './response/SepsisResult';
import { DenwisResult } from './response/DenwisResult';
import { CovidResult } from './response/CovidResult';
import { ResponseActions } from './response/actions/ResponseActions';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: '300px',
    margin: '0 auto',
  },
}));

const Chips = [
  'Just not themselves',
  'Dizzness',
  'Increased anxiety/agitation',
  'Reduced mobility/coordination',
  'Withdrawn',
  'Dehydration',
  'Had a fall',
  'Loss of appetite',
  'Skin changges (colour/puffiness)',
  'Recently lost consciousness',
];

const Response = () => {
  const classess = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const news2 = useSelector(selectNews2Response);
  const sepsis = useSelector(selectSepsis);
  const denwis = useSelector(selectDenwis);
  const covid = useSelector(selectCovid);
  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid item xs={12}>
        {news2 && <News2Result />}
        {sepsis?.response && <SepsisResult />}
        {denwis?.response && <DenwisResult />}
        {covid?.response && <CovidResult />}
      </Grid>
      <ResponseActions />
    </Grid>
  );
};
(Response as any).whyDidYouRender = {
  customName: 'Response',
};
export { Response };
