import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SepsisIcon } from 'components';
import { useSelector } from 'react-redux';
import {
  selectSepsis,
  selectPatientNHS,
  selectPatientName,
} from '../../selectors';
import uniqid from 'uniqid';
import clsx from 'clsx';

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

const Section: React.FC<{
  redFlags?: { code: string; value: string }[];
  amberFlags?: { code: string; value: string }[];
  flags999?: { code: string; value: string }[];
  section: string;
}> = ({ redFlags = [], amberFlags = [], flags999 = [], section }) => {
  const classes = useStyles();
  if ([...redFlags, ...amberFlags, ...flags999].length === 0) {
    return null;
  }
  return (
    <>
      <Box pt={1}>
        <Box
          className={clsx(classes.root, classes.label)}
          display="flex"
          justifyContent="center"
        >
          {section}
        </Box>
      </Box>
      <Box display="flex" flexWrap="nowrap" flexDirection="column">
        {redFlags &&
          redFlags.map(({ value }) => (
            <Box p={1} key={uniqid()}>
              <SepsisIcon value={{ value: 'red' }} />
              {value}
            </Box>
          ))}
        {flags999 &&
          flags999.map(({ value }) => (
            <Box p={1} key={uniqid()}>
              <SepsisIcon value={{ value: 'red' }} />
              {value}
            </Box>
          ))}
        {amberFlags &&
          amberFlags.map(({ value }) => (
            <Box p={1} key={uniqid()}>
              <SepsisIcon value={{ value: 'amber' }} />
              {value}
            </Box>
          ))}
      </Box>
    </>
  );
};

export const SepsisSummary = () => {
  const classes = useStyles();
  const sepsis = useSelector(selectSepsis);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);
  const isEmptyScreening = () => {
    const {
      riskFactorsForSepsis,
      likelySourceOfInfection,
      redFlags,
      amberFlags,
      flag999,
    } = sepsis;
    const riskFactorsForSepsisL = riskFactorsForSepsis
      ? riskFactorsForSepsis.length
      : 0;
    const likelySourceOfInfectionL = likelySourceOfInfection
      ? likelySourceOfInfection.length
      : 0;
    const redFlagsL = redFlags ? redFlags.length : 0;
    const amberFlagsL = amberFlags ? amberFlags.length : 0;
    const flag999L = flag999 ? flag999.length : 0;

    return (
      riskFactorsForSepsisL +
        likelySourceOfInfectionL +
        redFlagsL +
        amberFlagsL +
        flag999L ===
      0
    );
  };
  const isEmpty = isEmptyScreening();

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
            <Typography align="left" variant="body1" component="div" noWrap>
              <Box fontWeight={500}>{nhsNo}</Box>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {sepsis && isEmpty ? (
        <Typography align="center" variant="h6">
          You didn't select anything in sepsis screening.
        </Typography>
      ) : (
        <Box m={1}>
          <Section section="Sepsis Risk Factory" />
          <Section section="Likely source of infection" />
          <Section
            redFlags={sepsis?.redFlags}
            flags999={sepsis?.flags999}
            amberFlags={sepsis?.amberFlags}
            section="Severity"
          />
        </Box>
      )}
    </div>
  );
};
