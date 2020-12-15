import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { SepsisIcon } from 'components';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { selectSepsis } from '../../selectors';
import uniqid from 'uniqid';

const useStyles = makeStyles({
  body: {
    height: '108px',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#ffff',
    border: '2px solisd #DADADA',
    borderRadius: '15px',
  },
  fullHeight: { height: '100%' },
});
export const SepsisResult = () => {
  const classes = useStyles();
  const sepsis = useSelector(selectSepsis);
  const sepsisResponse = sepsis.response;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Box p={1}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        {...(xs ? {} : { style: { height: '128px' } })}
      >
        <Grid item xs={12} sm={4} className={classes.fullHeight}>
          <Box pl={1} pt={1} pb={1} className={classes.fullHeight}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="baseline"
              className={classes.fullHeight}
            >
              <Grid item>
                <Grid container direction="row">
                  <Grid item>
                    <Typography variant="subtitle1">
                      <Box mr={1} fontWeight="fontWeightBold">
                        SEPSIS Screening:
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <SepsisIcon value={sepsisResponse?.value} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box mr={1} fontWeight="fontWeightBold">
                  NICE Recommends rapid transfer to hospital
                </Box>
              </Grid>
              <Grid item>
                <Typography component="div" variant="body2">
                  Last observation: 11:25 04 Aug 2020
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box p={1}>
            <Box
              display="flex"
              p={1}
              component="div"
              className={classes.body}
              flexWrap="nowrap"
              flexDirection="column"
            >
              {sepsis?.redFlagAcute &&
                sepsis?.redFlagAcute.map(item => (
                  <Box p={1} key={uniqid()}>
                    <SepsisIcon value={{ value: 'red' }} />
                    {item}
                  </Box>
                ))}
              {sepsis?.amberFlagAcute &&
                sepsis?.amberFlagAcute.map(item => (
                  <Box p={1} key={uniqid()}>
                    <SepsisIcon value={{ value: 'amber' }} />
                    {item}
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
