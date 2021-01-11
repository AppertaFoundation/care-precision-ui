import React from 'react';
import {
  Box,
  Grid,
  Typography,
  ListItemText,
  ListItem,
  List,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { DenwisIcon } from 'components';
import { selectDenwis, selectResult } from '../../selectors';
import { formatTime, formatDate } from 'utils/formatters/time';

const useStyles = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: '100%',
  },
  body: {
    height: '108px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  comment: {
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#DADADA',
    border: '2px solid #fff',
    borderRadius: '15px',
  },
}));
export const DenwisResult = () => {
  const classes = useStyles();
  const denwis = useSelector(selectDenwis);
  const result = useSelector(selectResult);
  const denwisResponse = result?.denwis?.value;
  const updateDateTime = result?.denwis?.lastUpdate;

  const lastUpdate = `${formatTime(updateDateTime)} ${formatDate(
    updateDateTime,
  )}`;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Box p={1}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        {...(xs ? {} : { style: { height: '128px' } })}
      >
        <Grid item xs={12} sm={4} className={classes.fullHeight}>
          <Box pl={1} pt={1} pb={1} className={classes.fullHeight}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="baseline"
              className={classes.fullHeight}
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
                    <DenwisIcon denwis={denwisResponse} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Last observation: {lastUpdate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box p={1}>
            <Box
              display="flex"
              component="div"
              className={classes.body}
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
                      <ListItemText primary={denwis?.q9NurseSubjective.value} />
                    </ListItem>
                  )}
                </List>
              </Box>
              <Box width={1 / 2} p={1}>
                <div className={classes.comment}>
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
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
