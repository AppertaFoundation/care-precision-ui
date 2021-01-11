import React from 'react';
import {
  Box,
  Grid,
  Typography,
  ListItem,
  List,
  ListItemText,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCovid, selectResult } from '../../selectors';
import { CovidIcon } from 'components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import uniqid from 'uniqid';
import { formatTime, formatDate } from 'utils/formatters/time';

const useStyles = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: '100%',
  },
  body: {
    height: '108px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

export const CovidResult = () => {
  const classes = useStyles();
  const covid = useSelector(selectCovid);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const result = useSelector(selectResult);
  const covidResult = result?.covid?.value;
  const updateDateTime = result?.covid?.lastUpdate;
  const lastUpdate = `${formatTime(updateDateTime)} ${formatDate(
    updateDateTime,
  )}`;
  return (
    <Box p={1}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        {...(xs ? {} : { style: { maxHeight: '150px' } })}
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
                        COVID Assessment Outcome:
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CovidIcon value={covidResult} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box mr={1} fontWeight="fontWeightBold">
                  Suspected exposure and/or suspected Symptoms
                </Box>
              </Grid>
              <Grid item>
                <Typography component="div" variant="body2">
                  Last observation: {lastUpdate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box p={1}>
            <Box
              display="flex"
              component="div"
              className={classes.body}
              flexWrap="nowrap"
              flexDirection="column"
            >
              <Box pl={1}>
                <Typography variant="subtitle2">
                  Date of symptoms onset or contact 25/10/2020
                </Typography>
              </Box>
              <Box>
                <List
                  subheader={
                    <Box pl={1}>
                      <Typography align="justify" variant="subtitle2">
                        Symptoms:
                      </Typography>
                    </Box>
                  }
                  dense
                >
                  {covid?.symptoms.map(item => (
                    <ListItem key={uniqid()}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
