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
import { CovidIcon } from 'components';
import {
  selectPatientName,
  selectPatientNHS,
  selectCovid,
} from '../../selectors';

export const CovidSummary = () => {
  const covid = useSelector(selectCovid);
  const nhsNo = useSelector(selectPatientNHS);
  const name = useSelector(selectPatientName);
  const covidResult = covid?.response?.value;
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
      <Box pl={1}>
        <Typography variant="subtitle2">
          {`Date of symptoms onset or contact ${covid?.firstSympomsDate}`}
        </Typography>
        <CovidIcon value={covidResult} />
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
          Symptoms
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
            {covid?.symptoms &&
              covid.symptoms.map(symptom => (
                <ListItem>
                  <ListItemText primary={symptom} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </div>
  );
};
