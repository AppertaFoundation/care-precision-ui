import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { CarouselCard } from './SituatiionBackground';
import uniqid from 'uniqid';

const RecomendationsActions = () => {
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
              <CarouselCard label="Assessment">
                <Typography variant="caption">
                  <Box fontWeight="fontWeightBold">
                    21/01/2021 - 15:33 - User XYZ
                  </Box>
                </Typography>
                <Typography>DENWIS - Score 8</Typography>
                <Typography>NEWS2 - Score 3</Typography>

                <Typography variant="caption">
                  <Box fontWeight="fontWeightBold">
                    20/01/2021 - 22:24 - ZYX
                  </Box>
                </Typography>
                <Typography>SEPSIS - No Concerns </Typography>
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box mr={1}>
              <CarouselCard label="Intervention">
                <Typography variant="caption">
                  <Box fontWeight="fontWeightBold">
                    21/01/2021 - 15:33 - User XYZ
                  </Box>
                </Typography>
                <Typography>Internal Escalation </Typography>
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CarouselCard label="Monitoring">
              <Typography variant="caption">
                <Box fontWeight="fontWeightBold">
                  21/01/2021 - 15:33 - User XYZ
                </Box>{' '}
              </Typography>
              <Typography>Every 30 Minutes</Typography>
            </CarouselCard>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard label="Assessment" key={uniqid()}>
          <Typography variant="caption">
            <Box fontWeight="fontWeightBold">21/01/2021 - 15:33 - User XYZ</Box>
          </Typography>
          <Typography>DENWIS - Score 8</Typography>
          <Typography>NEWS2 - Score 3</Typography>

          <Typography variant="caption">
            <Box fontWeight="fontWeightBold">20/01/2021 - 22:24 - ZYX</Box>
          </Typography>
          <Typography>SEPSIS - No Concerns </Typography>
        </CarouselCard>,

        <CarouselCard label="Intervention" key={uniqid()}>
          <Typography variant="caption">
            <Box fontWeight="fontWeightBold">21/01/2021 - 15:33 - User XYZ</Box>
          </Typography>
          <Typography>Internal Escalation </Typography>
        </CarouselCard>,
        <CarouselCard label="Monitoring" key={uniqid()}>
          <Typography variant="caption">
            <Box fontWeight="fontWeightBold">21/01/2021 - 15:33 - User XYZ</Box>{' '}
          </Typography>
          <Typography>Every 30 Minutes</Typography>
        </CarouselCard>,
      ];
};

export { RecomendationsActions };
