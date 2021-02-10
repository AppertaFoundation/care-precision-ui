import React from 'react';
import {
  Grid,
  Box,
  Typography,
  ListItem,
  ListItemText,
  List,
  Paper,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { DenwisIcon, BoxWrapper } from 'components';
import {
  selectPatientName,
  selectPatientNHS,
  selectDenwis,
  selectResult,
} from '../../selectors';

import clsx from 'clsx';

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

export const DenwisSummary = () => {
  const classes = useStyles();
  const denwis = useSelector(selectDenwis);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);
  const result = useSelector(selectResult);
  const denwisResult = result?.denwis?.value;
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
      <Box p={1}>
        <Box
          className={clsx(classes.root, classes.label)}
          display="flex"
          justifyContent="center"
        >
          Concern noted for:
        </Box>
        <Box display="flex" flexWrap="nowrap" flexDirection="column">
          <List dense>
            {denwis?.q1Breathing?.code === 'at0031' && (
              <ListItem>
                <ListItemText
                  primary={denwis?.q1Breathing?.value}
                  secondary={
                    denwis?.breathingIndicator &&
                    denwis?.breathingIndicator.join(', ')
                  }
                />
              </ListItem>
            )}
            {denwis?.q2Circulation?.code === 'at0036' && (
              <ListItem>
                <ListItemText
                  primary={denwis?.q2Circulation?.value}
                  secondary={
                    denwis?.circulationIndeticator &&
                    denwis?.circulationIndeticator.join(', ')
                  }
                />
              </ListItem>
            )}
            {denwis?.q3Temperature?.code === 'at0105' && (
              <ListItem>
                <ListItemText primary={denwis?.q3Temperature?.value} />
              </ListItem>
            )}
            {denwis?.q4Mentation?.code === 'at0045' && (
              <ListItem>
                <ListItemText primary={denwis?.q4Mentation?.value} />
              </ListItem>
            )}
            {denwis?.q5Agitation?.code === 'at0049' && (
              <ListItem>
                <ListItemText primary={denwis?.q5Agitation?.value} />
              </ListItem>
            )}
            {denwis?.q6Pain?.code === 'at0052' && (
              <ListItem>
                <ListItemText primary={denwis?.q6Pain?.value} />
              </ListItem>
            )}
            {denwis?.q7Trajectory?.code === 'at0055' && (
              <ListItem>
                <ListItemText primary={denwis?.q7Trajectory?.value} />
              </ListItem>
            )}
            {denwis?.q8PatientSubjective?.code === 'at0058' && (
              <ListItem>
                <ListItemText primary={denwis?.q8PatientSubjective?.value} />
              </ListItem>
            )}
            {denwis?.q9NurseSubjective?.code === 'at0061' && (
              <ListItem>
                <ListItemText primary={denwis?.q9NurseSubjective?.value} />
              </ListItem>
            )}
          </List>
        </Box>
      </Box>
      <Box p={1}>
        <Box
          className={clsx(classes.root, classes.label)}
          display="flex"
          justifyContent="center"
        >
          Other Notes:
        </Box>
        <Box display="flex" flexWrap="nowrap" flexDirection="column">
          <List dense>
            <ListItem>
              <ListItemText primary={denwis?.q10OtherComment} />
            </ListItem>
          </List>
        </Box>
      </Box>
      {denwisResult && (
        <BoxWrapper>
          <Box
            display="flex"
            flexWrap="nowrap"
            alignItems="center"
            style={{
              backgroundColor:
                denwisResult?.value === 0
                  ? 'grey'
                  : denwisResult?.value > 4
                  ? 'red'
                  : 'green',
              color: '#fff',
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
                <Box>{`DENWIS Outcome : ${denwisResult?.value}`}</Box>
              </Box>
            </Box>
            <Box width={1 / 4} pr={1}>
              <Paper elevation={0}>
                <Box
                  display="flex"
                  width={'100%'}
                  alignItems="center"
                  justifyContent="center"
                >
                  {denwisResult && <DenwisIcon denwis={denwisResult} />}
                </Box>
              </Paper>
            </Box>
          </Box>
        </BoxWrapper>
      )}
    </div>
  );
};
