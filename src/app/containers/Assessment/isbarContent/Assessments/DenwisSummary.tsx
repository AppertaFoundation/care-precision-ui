import React from 'react';
import {
  Grid,
  Box,
  Typography,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { DenwisIcon } from 'components';
import {
  selectPatientName,
  selectPatientNHS,
  selectDenwis,
} from '../../selectors';

export const DenwisSummary = () => {
  const denwis = useSelector(selectDenwis);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);
  const denwisResult = denwis?.response?.value;
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
      <Box p={1}>
        <Box
          style={{
            backgroundColor: '#515F9C',
            color: '#fff',
            maxWidth: '150px',
          }}
          display="flex"
          justifyContent="center"
        >
          Concern noted for:
        </Box>
        <Box
          display="flex"
          style={{
            border: '0.0469em solid #757575',
            borderRadius: '4px',
          }}
          flexWrap="nowrap"
          flexDirection="column"
        >
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
                <ListItemText primary={denwis?.q8PatientSubjective.value} />
              </ListItem>
            )}
            {denwis?.q9NurseSubjective.id === 'at0061' && (
              <ListItem>
                <ListItemText primary={denwis?.q9NurseSubjective.value} />
              </ListItem>
            )}
          </List>
        </Box>
      </Box>
      <Box p={1}>
        <Box
          style={{
            backgroundColor: '#515F9C',
            color: '#fff',
            maxWidth: '150px',
          }}
          display="flex"
          justifyContent="center"
        >
          Other Notes:
        </Box>
        <Box
          display="flex"
          style={{
            border: '0.0469em solid #757575',
            borderRadius: '4px',
          }}
          flexWrap="nowrap"
          flexDirection="column"
        >
          <Box pl={1}>
            {' '}
            <ListItemText primary={denwis?.q10OtherComment} />
          </Box>
        </Box>
      </Box>
      <div style={{ width: '100%' }}>
        <Box
          display="flex"
          flexWrap="nowrap"
          alignItems="center"
          style={{
            backgroundColor:
              denwisResult.value === 0
                ? 'grey'
                : denwisResult.value > 4
                ? 'red'
                : 'green',
            color: '#fff',
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
            <div
              style={{
                backgroundColor: '#fff',
                color: '#000',
                border: '0.0469em solid red',
              }}
            >
              <Box
                display="flex"
                width={'100%'}
                alignItems="center"
                justifyContent="center"
                // pb={1} pt={1} alignItems="center"
              >
                <DenwisIcon denwis={denwisResult} />
              </Box>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};
