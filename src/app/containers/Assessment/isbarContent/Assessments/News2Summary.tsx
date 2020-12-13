import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import uniqid from 'uniqid';

import { News2Icon } from 'components';
import { useSelector } from 'react-redux';
import {
  selectNews2Response,
  selectPatientName,
  selectPatientNHS,
} from '../../selectors';

const mapTotalScoreBackground = (score: string): string => {
  return {
    at0060: '#F40013',
    at0059: '#FBC384',
    at0058: '#fbf184',
    at0057: '#2E7D32',
  }[score];
};

const mapTotalScoreColor = clinicalRisk =>
  clinicalRisk === 'at0060' || clinicalRisk === 'at0057' ? '#fff' : '#000';

const Parametr = ({ parametr, value, valueUnits, score }) => {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" alignItems="center" p={0} pl={1} pr={1}>
        <Box width={2 / 5} mr={1}>
          {parametr}
        </Box>
        <Box width={2 / 5} mr={1}>
          {valueUnits}
        </Box>
        <Box width={1 / 5}>
          <News2Icon news2={{ value: score, clinicalRisk: score }} isParametr />
        </Box>
      </Box>
    </div>
  );
};

const Section = ({ items, section }) => {
  return (
    <>
      <Box pt={1}>
        <Box
          style={{
            backgroundColor: '#515F9C',
            color: '#fff',
            maxWidth: '50px',
          }}
          display="flex"
          justifyContent="center"
        >
          {section}
        </Box>
      </Box>
      {items.map(({ label, value, units, ordinal }) => {
        return (
          <Box pb={1} key={uniqid()}>
            <Box
              display="flex"
              style={{
                border: '0.0469em solid #757575',
                borderRadius: '4px',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '100%' }}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{
                    border: '0.0469em solid #757575',
                    borderRadius: '4px',
                    alignItems: 'center',
                  }}
                >
                  <Box width={'100%'} mr={1}>
                    <Parametr
                      parametr={label}
                      valueUnits={`${value} ${units ? units : ''}`}
                      value={value}
                      score={ordinal}
                    />
                  </Box>
                </Box>
              </div>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

const TotalNEWSScore = ({ score, clinicalRisk }) => {
  const absoluteScore = Math.abs(score);
  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        style={{
          backgroundColor: mapTotalScoreBackground(clinicalRisk),
          color: mapTotalScoreColor(score),
        }}
      >
        <Box width={3 / 4}>
          <Box
            width="100%"
            display="flex"
            fontWeight="fontWeightBold"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>{`Total NEWS Score : ${absoluteScore}`}</Box>
            <Box>{`Clinical Risk: ${clinicalRisk}`}</Box>
          </Box>
        </Box>
        <Box width={1 / 4} pr={1}>
          <div style={{ backgroundColor: '#fff', color: '#000' }}>
            <News2Icon news2={{ value: score, clinicalRisk }} />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export function News2Summary() {
  const response = useSelector(selectNews2Response);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);

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
      {response && (
        <Box m={1}>
          <Section
            items={[
              {
                ...response.respirationRate,
                label: 'Respiration Rate',
                units: 'bpm',
              },

              {
                ...response.spoScale_1,
                label: 'Oxygen Saturation',
                units: '%',
              },
            ]}
            section="A + B"
          />
          <Section
            items={[
              {
                ...response.systolicBloodPressure,
                label: 'Systolic B. P.',
                units: 'mmHg',
              },

              {
                ...response.pulse,
                label: 'Pulse Rate',
                units: 'bpm',
              },
            ]}
            section="C"
          />
          <Section
            items={[
              {
                ...response.consciousness,
                label: 'Consciousness',
                units: '',
              },

              {
                ...response.temperature,
                label: 'Temperature',
                units: "'C",
              },
            ]}
            section="D + E"
          />

          <TotalNEWSScore
            score={response?.totalScore}
            clinicalRisk={response?.clinicalRiskCategory.code}
          />
        </Box>
      )}
    </div>
  );
}
