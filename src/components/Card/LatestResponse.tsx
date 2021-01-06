import React from 'react';
import { Grid, Box, IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useStylesLastResponse } from './style';
import MuiIconButton from '@material-ui/core/Button';
import DenwisIcon from '../DenwisIcon';
import News2Icon from '../News2Icon';
import CovidIcon from '../CovidIcon';
import SepsisIcon from '../SepsisIcon';

const IconButtonNews2 = withStyles({
  root: {
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 0,
  },
})(MuiIconButton);

const LatestResponse = ({ assessments, sm, id }) => {
  const classes = useStylesLastResponse();
  const navigate = useNavigate();
  const goToCovid = e => navigate(`/covid-menagment/${id}`);
  return (
    <Box mr={1}>
      <Grid
        container
        direction="row"
        alignItems="center"
        {...(sm ? { className: classes.container } : {})}
      >
        {assessments?.denwis.value && (
          <Grid item>
            <IconButtonNews2
              onClick={() => console.log('denwis')}
              {...(sm ? { size: 'small' } : {})}
            >
              <DenwisIcon denwis={assessments?.denwis.value} />
            </IconButtonNews2>
          </Grid>
        )}
        {assessments?.sepsis.value && (
          <>
            <Grid item>
              <IconButton
                onClick={() => console.log('sepsis')}
                {...(sm ? { size: 'small' } : {})}
              >
                <SepsisIcon value={assessments.sepsis.value} />
              </IconButton>
            </Grid>
          </>
        )}
        {assessments?.news2.value && (
          <>
            <Grid item>
              <IconButtonNews2
                onClick={() => console.log('news2')}
                {...(sm ? { size: 'small' } : {})}
              >
                <News2Icon news2={assessments.news2.value} />
              </IconButtonNews2>
            </Grid>
          </>
        )}
        {assessments?.covid.value && (
          <>
            <Grid item>
              <IconButton
                onClick={goToCovid}
                {...(sm ? { size: 'small' } : {})}
              >
                <CovidIcon value={assessments.covid.value} />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LatestResponse;
