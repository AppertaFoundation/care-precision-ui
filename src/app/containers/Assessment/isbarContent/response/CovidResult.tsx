import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  ListItem,
  List,
  ListItemText,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCovid } from '../../selectors';
import { CovidIcon } from 'components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
export const CovidResult = () => {
  const covid = useSelector(selectCovid);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Box p={1}>
      <Paper elevation={1} variant="outlined" square>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          {...(xs ? {} : { style: { maxHeight: '150px' } })}
        >
          <Grid item xs={12} sm={4} style={{ height: '100%' }}>
            <Box pl={1} pt={1} pb={1} style={{ height: '100%' }}>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="baseline"
                style={{ height: '100%' }}
              >
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="subtitle1">
                        <Box mr={1} fontWeight="fontWeightBold">
                          COVID Assessment Outcome:
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <CovidIcon value={covid?.response?.value} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box mr={1} fontWeight="fontWeightBold">
                    Suspected exposure and/or suspected Symptoms
                  </Box>
                </Grid>
                <Grid item>
                  <Typography component="div" variant="body2">
                    Last observation: 11:25 04 Aug 2020
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box p={1}>
              <Paper variant="outlined" square>
                <Box
                  display="flex"
                  component="div"
                  style={{
                    height: '108px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                  }}
                  flexWrap="nowrap"
                  flexDirection="column"
                >
                  <Box pl={1}>
                    <Typography variant="subtitle2">
                      Date of symptoms onset or contact 25/10/2020
                    </Typography>
                  </Box>
                  <Box>
                    <List
                      subheader={
                        <Box pl={1}>
                          <Typography align="justify" variant="subtitle2">
                            Symptoms:
                          </Typography>
                        </Box>
                      }
                      dense
                    >
                      {covid?.symptoms.map(item => (
                        <ListItem>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
