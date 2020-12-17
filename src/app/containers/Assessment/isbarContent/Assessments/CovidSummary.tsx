import React from 'react';
import {
  Grid,
  Box,
  Typography,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { CovidIcon } from 'components';
import {
  selectPatientName,
  selectPatientNHS,
  selectCovid,
} from '../../selectors';
import clsx from 'clsx';
import uniqid from 'uniqid';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#DADADA',
    border: '2px solid #fff',
    borderRadius: '15px',
    padding: '10px',
  },
  label: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export const CovidSummary = () => {
  const classes = useStyles();
  const covid = useSelector(selectCovid);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);
  const covidResult = covid?.response?.value;
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item>
          <Box>
            <Typography align="left" component="div" variant="h6" noWrap>
              <Box fontWeight={500}>{name}</Box>
            </Typography>
          </Box>
          <Box>
            <Typography component="div" align="left" variant="body1" noWrap>
              <Box fontWeight={500}>{nhsNo}</Box>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        {covidResult && <CovidIcon value={covidResult} />}
      </Box>

      <Box mt={2} mb={2}>
        <Box
          className={clsx(classes.root, classes.label)}
          display="flex"
          justifyContent="center"
        >
          Date
        </Box>
        <Box>
          <List dense>
            <ListItem>
              <ListItemText>{covid?.firstSympomsDate}</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box p={1}>
        <Box
          className={clsx(classes.root, classes.label)}
          display="flex"
          justifyContent="center"
        >
          Symptoms
        </Box>
        <Box display="flex" flexWrap="nowrap" flexDirection="column">
          <List dense>
            {covid?.symptoms &&
              covid.symptoms.map(symptom => (
                <ListItem key={uniqid()}>
                  <ListItemText primary={symptom} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </div>
  );
};
