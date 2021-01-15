import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { CarouselCard } from './SituatiionBackground';
import uniqid from 'uniqid';

const RecomendationsActions = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('sm'));
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
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box mr={1}>
              <CarouselCard label="Intervention">
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CarouselCard label="Monitoring">
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CarouselCard>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard label="Assessment" key={uniqid()}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CarouselCard>,

        <CarouselCard label="Intervention" key={uniqid()}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CarouselCard>,
        <CarouselCard label="Monitoring" key={uniqid()}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CarouselCard>,
      ];
};

export { RecomendationsActions };
