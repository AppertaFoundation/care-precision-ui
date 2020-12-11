import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  ListItemText,
  ListItem,
  List,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { DenwisIcon } from 'components';
import { selectDenwis } from '../../selectors';

export const DenwisResult = () => {
  const denwis = useSelector(selectDenwis);
  const denwisResponse = denwis.response;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box p={1}>
      <Paper elevation={1} variant="outlined" square>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          {...(xs ? {} : { style: { height: '128px' } })}
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
                          {`DENWIS Outcome: outcome`}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <DenwisIcon denwis={denwisResponse?.value} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
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
                  // p={1}
                  component="div"
                  style={{
                    height: '108px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                  }}
                  flexWrap="nowrap"
                  flexDirection="row"
                >
                  <Box width={1 / 2}>
                    <List dense>
                      {denwis?.q1Breathing.id === 'at0031' && (
                        <ListItem>
                          <ListItemText
                            primary={denwis?.q1Breathing.value}
                            secondary={
                              denwis?.breathingIndicator &&
                              denwis?.breathingIndicator.join(', ')
                            }
                          />
                        </ListItem>
                      )}
                      {denwis?.q2Circulation.id === 'at0036' && (
                        <ListItem>
                          <ListItemText
                            primary={denwis?.q2Circulation.value}
                            secondary={
                              denwis?.circulationIndeticator &&
                              denwis?.circulationIndeticator.join(', ')
                            }
                          />
                        </ListItem>
                      )}
                      {denwis?.q3Temperature.id === 'at0105' && (
                        <ListItem>
                          <ListItemText primary={denwis?.q3Temperature.value} />
                        </ListItem>
                      )}
                      {denwis?.q4Mentation.id === 'at0045' && (
                        <ListItem>
                          <ListItemText primary={denwis?.q4Mentation.value} />
                        </ListItem>
                      )}
                      {denwis?.q5Agitation.id === 'at0049' && (
                        <ListItem>
                          <ListItemText primary={denwis?.q5Agitation.value} />
                        </ListItem>
                      )}
                      {denwis?.q6Pain.id === 'at0052' && (
                        <ListItem>
                          <ListItemText primary={denwis?.q6Pain.value} />
                        </ListItem>
                      )}
                      {denwis?.q7Trajectory.id === 'at0055' && (
                        <ListItem>
                          <ListItemText primary={denwis?.q7Trajectory.value} />
                        </ListItem>
                      )}
                      {denwis?.q8PatientSubjective.id === 'at0058' && (
                        <ListItem>
                          <ListItemText
                            primary={denwis?.q8PatientSubjective.value}
                          />
                        </ListItem>
                      )}
                      {denwis?.q9NurseSubjective.id === 'at0061' && (
                        <ListItem>
                          <ListItemText
                            primary={denwis?.q9NurseSubjective.value}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                  <Box width={1 / 2} p={1}>
                    <Paper variant="outlined" square>
                      <Typography align="center" variant="subtitle2" paragraph>
                        Other notes
                      </Typography>
                      <Typography
                        gutterBottom
                        component="div"
                        align="center"
                        variant="body2"
                      >
                        {denwis?.q10OtherComment}
                      </Typography>
                    </Paper>
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
