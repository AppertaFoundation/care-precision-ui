import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Badge as MuiBadge,
  Paper,
} from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import uniqid from 'uniqid';

import { News2Icon, BoxWrapper } from 'components';
import { useSelector } from 'react-redux';
import {
  selectResult,
  selectPatientName,
  selectPatientNHS,
} from '../../selectors';

const Badge = withStyles({
  root: {
    width: '100%',
  },
  badge: {
    minWidth: '50px',
    top: '-6px',
  },
})(MuiBadge);
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

const clinicalRiskCodeMapping = value =>
  ({
    at0057: 'Low',
    at0058: 'Low-medium',
    at0059: 'Medium',
    at0060: 'Hight',
  }[value]);

const Parametr = ({ parametr, value, valueUnits, score }) => {
  return (
    <BoxWrapper>
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
    </BoxWrapper>
  );
};

const Section = ({ items, section }) => {
  return (
    <BoxWrapper>
      <Badge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        color="primary"
        badgeContent={section}
      >
        <BoxWrapper>
          <Box pb={2} flexDirection="column">
            {items.map(({ label, value, units, ordinal }) => {
              return (
                <Box pb={1} key={uniqid()}>
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
                </Box>
              );
            })}
          </Box>
        </BoxWrapper>
      </Badge>
    </BoxWrapper>
  );
};

const TotalNEWSScore = ({ score, clinicalRisk }) => {
  const absoluteScore = Math.abs(score);
  return (
    <BoxWrapper>
      <Box
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        style={{
          backgroundColor: mapTotalScoreBackground(clinicalRisk),
          color: mapTotalScoreColor(score),
          border: '2px solid #fff',
          borderRadius: '15px',
          padding: '10px',
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
            <Box>{`Clinical Risk: ${clinicalRiskCodeMapping(
              clinicalRisk,
            )}`}</Box>
          </Box>
        </Box>
        <Box width={1 / 4} pr={1}>
          <Paper elevation={0}>
            <News2Icon news2={{ value: score, clinicalRisk }} />
          </Paper>
        </Box>
      </Box>
    </BoxWrapper>
  );
};

export function News2Summary() {
  const classes = useStyles();
  // const response = useSelector(selectNews2Response);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);
  const result = useSelector(selectResult);
  const response = result?.news2?.value?.value;
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
      {response && (
        <Box m={2}>
          <Section
            items={[
              {
                ...response?.respirationRate,
                label: 'Respiration Rate',
                units: 'bpm',
              },

              {
                ...response?.spoScale_1,
                label: 'Oxygen Saturation',
                units: '%',
              },
            ]}
            section="A + B"
          />
          <Section
            items={[
              {
                ...response?.systolicBloodPressure,
                label: 'Systolic B. P.',
                units: 'mmHg',
              },

              {
                ...response?.pulse,
                label: 'Pulse Rate',
                units: 'bpm',
              },
            ]}
            section="C"
          />
          <Section
            items={[
              {
                ...response?.consciousness,
                label: 'Consciousness',
                units: '',
              },

              {
                ...response?.temperature,
                label: 'Temperature',
                units: "'C",
              },
            ]}
            section="D + E"
          />

          <TotalNEWSScore
            score={response?.totalScore}
            clinicalRisk={response?.clinicalRiskCategory?.code}
          />
        </Box>
      )}
    </div>
  );
}
