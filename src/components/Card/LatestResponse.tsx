import React from 'react';
import { Grid, Box } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import { useStylesLastResponse } from './style';
import DenwisIcon from '../DenwisIcon';
import News2Icon from '../News2Icon';
import CovidIcon from '../CovidIcon';
import SepsisIcon from '../SepsisIcon';

const LatestResponse = ({ assessments, sm, id }) => {
  const classes = useStylesLastResponse();
  // const history = useHistory();
  // const goToCovid = () => history.push(`/covid-management/${id}`);
  return (
    <Box mr={1}>
      <Grid
        container
        direction="row"
        alignItems="center"
        {...(sm ? { className: classes.container } : {})}
      >
        {assessments?.denwis?.value && (
          <Grid item>
            {/* <IconButtonNews2
              onClick={() => console.log('denwis')}
              {...(sm ? { size: 'small' } : {})}
            > */}
            <DenwisIcon label denwis={assessments?.denwis?.value} />
            {/* </IconButtonNews2> */}
          </Grid>
        )}
        {assessments?.sepsis?.value && (
          <>
            <Grid item>
              <SepsisIcon label value={assessments?.sepsis?.value} />
            </Grid>
          </>
        )}
        {assessments?.news2?.value && (
          <>
            <Grid item>
              <News2Icon label news2={assessments?.news2?.value} />
            </Grid>
          </>
        )}
        {assessments?.covid?.value && (
          <>
            <Grid item>
              <CovidIcon label value={assessments?.covid?.value} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LatestResponse;
