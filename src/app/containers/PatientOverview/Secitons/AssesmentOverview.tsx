import React from 'react';
import { Box, Grid, IconButton } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Text,
  //  DenwisIcon,
  News2Icon,
  SepsisIcon,
  CovidIcon,
} from 'components';
import { CarouselCard } from './SituatiionBackground';
import uniqid from 'uniqid';

interface IAssesmentOverviewCard {
  assesmentType: string;
  taken: string;
  denwis?: any;
  news2?: any;
  sepsis?: any;
  covid?: any;
  keyInformation: string;
}
const AssesmentOverviewCard: React.FC<IAssesmentOverviewCard> = ({
  assesmentType,
  taken,
  denwis,
  news2,
  sepsis,
  covid,
  keyInformation,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" flexDirection="column">
        <Box width="100%">
          <Box display="flex">
            <Box width="100%">
              <Text label="Last Taken">{taken}</Text>
            </Box>
            <Box flexShrink={1}>
              {
                {
                  denwis: (
                    <IconButton
                      onClick={() => console.log('denwis')}
                      size="small"
                    ></IconButton>
                  ),
                  news2: (
                    <IconButton
                      onClick={() => console.log('news2')}
                      size="small"
                    >
                      <News2Icon news2={news2} />
                    </IconButton>
                  ),
                  sepsis: (
                    <IconButton
                      onClick={() => console.log('sepsis')}
                      size="small"
                    >
                      <SepsisIcon value={sepsis} />
                    </IconButton>
                  ),
                  covid: (
                    <IconButton
                      onClick={() => console.log('covid')}
                      size="small"
                    >
                      <CovidIcon value={covid} />
                    </IconButton>
                  ),
                }[assesmentType]
              }
            </Box>
          </Box>
        </Box>

        <Box width="100">
          {
            {
              denwis: <Text label="DENWIS  Score">9</Text>,
              news2: <Text label="NEWS2  Score">9</Text>,
              sepsis: <Text label="SEPSIS Outcome">9</Text>,
              covid: <Text label="COVID  Outcome">9</Text>,
            }['news2']
          }
        </Box>
        <Box width="100%">
          <Text label="Key Information">{keyInformation}</Text>
        </Box>
      </Box>
    </div>
  );
};

const AssesmentOverview = ({ news2, denwis, sepsis, covid }) => {
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
              <CarouselCard label="DENWIS">
                <AssesmentOverviewCard
                  assesmentType="denwis"
                  taken="22-Feb-2020"
                  denwis={null}
                  keyInformation="None"
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box mr={1}>
              <CarouselCard label="NEWS2">
                <AssesmentOverviewCard
                  assesmentType="news2"
                  taken="22-Feb-2020"
                  news2={news2}
                  keyInformation="None"
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CarouselCard label="SEPIS">
              <AssesmentOverviewCard
                assesmentType="sepsis"
                taken="22-Feb-2020"
                sepsis={sepsis}
                keyInformation="None"
              />
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
              <CarouselCard label="COVID">
                <AssesmentOverviewCard
                  assesmentType="covid"
                  taken="22-Feb-2020"
                  covid={covid}
                  keyInformation="None"
                />
              </CarouselCard>
            </Box>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard label="DENWIS" key={uniqid()}>
          <AssesmentOverviewCard
            assesmentType="denwis"
            taken="22-Feb-2020"
            denwis={denwis}
            keyInformation="None"
          />
        </CarouselCard>,

        <CarouselCard label="NEWS2" key={uniqid()}>
          <AssesmentOverviewCard
            assesmentType="news2"
            taken="22-Feb-2020"
            news2={news2}
            keyInformation="None"
          />
        </CarouselCard>,
        <CarouselCard label="SEPSIS" key={uniqid()}>
          <AssesmentOverviewCard
            assesmentType="sepsis"
            taken="22-Feb-2020"
            sepsis={sepsis}
            keyInformation="None"
          />
        </CarouselCard>,
        <CarouselCard label="COVID" key={uniqid()}>
          <AssesmentOverviewCard
            assesmentType="covid"
            taken="22-Feb-2020"
            covid={covid}
            keyInformation="None"
          />
        </CarouselCard>,
      ];
};

export { AssesmentOverview };
