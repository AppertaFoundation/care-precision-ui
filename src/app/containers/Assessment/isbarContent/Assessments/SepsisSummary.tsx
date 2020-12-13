import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { SepsisIcon } from 'components';
import { useSelector } from 'react-redux';
import {
  selectSepsis,
  selectPatientNHS,
  selectPatientName,
} from '../../selectors';

const Section: React.FC<{
  indicators?: string[];
  redFlagAcute?: string[];
  amberFlagAcute?: string[];
  section: string;
}> = ({ indicators = [], redFlagAcute = [], amberFlagAcute = [], section }) => {
  if ([...indicators, ...redFlagAcute, ...amberFlagAcute].length === 0) {
    return null;
  }
  return (
    <>
      <Box pt={1}>
        <Box
          style={{
            backgroundColor: '#515F9C',
            color: '#fff',
            maxWidth: '250px',
          }}
          display="flex"
          justifyContent="center"
        >
          {section}
        </Box>
      </Box>
      <Box
        display="flex"
        style={{
          border: '0.0469em solid #757575',
          borderRadius: '4px',
        }}
        flexWrap="nowrap"
        flexDirection="column"
      >
        {indicators && indicators.map(item => <Box p={1}>{item}</Box>)}
        {redFlagAcute &&
          redFlagAcute.map(item => (
            <Box p={1}>
              <SepsisIcon value={{ value: 'red' }} />
              {item}
            </Box>
          ))}
        {amberFlagAcute &&
          amberFlagAcute.map(item => (
            <Box p={1}>
              <SepsisIcon value={{ value: 'amber' }} />
              {item}
            </Box>
          ))}
      </Box>
    </>
  );
};

export const SepsisSummary = () => {
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
    <div style={{ border: '1px solid black', borderRadius: 2 }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{ backgroundColor: 'lightgrey' }}
      >
        <Grid item>
          <Box ml={1}>
            <Typography align="left" component="h6" noWrap>
              <Box fontWeight={500}>{name}</Box>
            </Typography>
          </Box>
          <Box ml={1}>
            <Typography align="left" component="h6" noWrap>
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
          <Section
            indicators={sepsis?.riskFactorsForSepsis}
            section="Sepsis Risk Factory"
          />
          <Section
            indicators={sepsis?.likelySourceOfInfection}
            section="Likely source of infection"
          />
          <Section
            redFlagAcute={sepsis?.redFlagAcute}
            amberFlagAcute={sepsis?.amberFlagAcute}
            section="Servenity"
          />
        </Box>
      )}
    </div>
  );
};
