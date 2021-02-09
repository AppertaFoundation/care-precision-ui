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
  redFlagAcute?: { code: string; label: string }[];
  amberFlagAcute?: { code: string; label: string }[];
  section: string;
}> = ({ redFlagAcute = [], amberFlagAcute = [], section }) => {
  const classes = useStyles();
  if ([...redFlagAcute, ...amberFlagAcute].length === 0) {
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
        {redFlagAcute &&
          redFlagAcute.map(({ label }) => (
            <Box p={1} key={uniqid()}>
              <SepsisIcon value={{ value: 'red' }} />
              {label}
            </Box>
          ))}
        {amberFlagAcute &&
          amberFlagAcute.map(({ label }) => (
            <Box p={1} key={uniqid()}>
              <SepsisIcon value={{ value: 'amber' }} />
              {label}
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
      redFlagAcute,
      amberFlagAcute,
    } = sepsis;
    const riskFactorsForSepsisL = riskFactorsForSepsis
      ? riskFactorsForSepsis.length
      : 0;
    const likelySourceOfInfectionL = likelySourceOfInfection
      ? likelySourceOfInfection.length
      : 0;
    const redFlagAcuteL = redFlagAcute ? redFlagAcute.length : 0;
    const amberFlagAcuteL = amberFlagAcute ? amberFlagAcute.length : 0;
    return (
      riskFactorsForSepsisL +
        likelySourceOfInfectionL +
        redFlagAcuteL +
        amberFlagAcuteL ===
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
            redFlagAcute={sepsis?.redFlagAcute}
            amberFlagAcute={sepsis?.amberFlagAcute}
            section="Severity"
          />
        </Box>
      )}
    </div>
  );
};
