import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import VeryFit from '../../Assessment/isbarContent/assests/very-fit.jpeg';
import Well from '../../Assessment/isbarContent/assests/well.jpeg';
import ManagingWell from '../../Assessment/isbarContent/assests/managing-well.jpeg';
import Vulnerable from '../../Assessment/isbarContent/assests/vulnerable.jpeg';
import MildlyFrail from '../../Assessment/isbarContent/assests/mildly-frail.jpeg';
import ModeratelyFrail from '../../Assessment/isbarContent/assests/moderately-frail.jpeg';
import SeverelyFrail from '../../Assessment/isbarContent/assests/severely-frail.jpeg';
import VerySeverelyFrail from '../../Assessment/isbarContent/assests/very-severely-frail.jpeg';
import TerminallyIll from '../../Assessment/isbarContent/assests/terminally-ill.jpeg';

import uniqid from 'uniqid';
import { useStyles } from '../style';

const FRALITY = {
  at0005: VeryFit,
  at0006: Well,
  at0007: ManagingWell,
  at0008: Vulnerable,
  at0009: MildlyFrail,
  at0010: ModeratelyFrail,
  at0011: SeverelyFrail,
  at0012: VerySeverelyFrail,
  at0013: TerminallyIll,
};

export const CarouselCard = ({ children, label }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle2" align="center">
        {label}
      </Typography>
      <Box mt={1} mb={1} className={classes.subSection}>
        <div className={classes.demo}>{children}</div>
      </Box>
    </>
  );
};

const SituationBackgroundSteps = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('md'));
  return md
    ? [
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
          key={uniqid()}
        >
          <Grid item sm={4} xs={12}>
            <Box mr={1}>
              <CarouselCard label="Softsigns">
                <List dense={true}>
                  {['Just not themselves', 'Loss of appetite'].map(sign => (
                    <ListItem key={uniqid()}>
                      <ListItemText
                        primary={sign}
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box mr={1}>
              <CarouselCard label="Patient Problem">
                <Typography>No data available</Typography>
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CarouselCard label="Frality Overview">
              <Box display="flex" flexDirection="row">
                <Box>
                  <img src={FRALITY['at0005']} alt="very fit" />
                </Box>
                <Box flexShrink={6}>
                  <Typography variant="caption">Very Fit</Typography>
                  <Typography>
                    People who are robust, active, energetic and motivated.
                    These people commonly exercise regularly. They are among the
                    fittest for their age.
                  </Typography>
                </Box>
              </Box>
            </CarouselCard>
          </Grid>
        </Grid>,
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
          key={uniqid()}
        >
          <Grid item xs={12} sm={4}>
            <Box mr={1}>
              <CarouselCard label="Current Medication">
                <Typography>No data available. </Typography>
              </CarouselCard>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <CarouselCard label="Comorbidities">
                <Typography>No data available.</Typography>
              </CarouselCard>
            </Box>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard label="Softsigns" key={uniqid()}>
          <List dense={true}>
            {['Just not themselves', 'Loss of appetite'].map(sign => (
              <ListItem key={uniqid()}>
                <ListItemText
                  primary={sign}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))}
          </List>
        </CarouselCard>,
        <CarouselCard label="Patient Problem" key={uniqid()}>
          <Typography>No data available.</Typography>
        </CarouselCard>,
        <CarouselCard label="Frality Overview" key={uniqid()}>
          <Box display="flex" flexDirection="row">
            <Box>
              <img src={FRALITY['at0005']} alt="very fit" />
            </Box>
            <Box flexShrink={6}>
              <Typography variant="caption">Very Fit</Typography>
              <Typography>
                People who are robust, active, energetic and motivated. These
                people commonly exercise regularly. They are among the fittest
                for their age.
              </Typography>
            </Box>
          </Box>
        </CarouselCard>,
        <CarouselCard label="Current Medication" key={uniqid()}>
          <Typography>No data available.</Typography>
        </CarouselCard>,
        <CarouselCard label="Comorbidities" key={uniqid()}>
          <Typography>No data available.</Typography>
        </CarouselCard>,
      ];
};

export { SituationBackgroundSteps };
