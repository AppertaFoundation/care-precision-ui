import React from 'react';

import MuiTableCell from '@material-ui/core/TableCell';
import {
  Typography,
  Paper,
  TableRow,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  FormLabel,
  Grid,
} from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './style';

import { tPatientsList } from 'types';
import { Row } from './Row';
import uniqid from 'uniqid';

const TableCell = withStyles(() => ({
  body: {
    color: 'rgb(77, 77, 77)',
  },
}))(MuiTableCell);

function createData(
  birthDate,
  gender,
  name,
  id,
  location,
  nhsnumber,
  assessment,
) {
  return {
    birthDate,
    gender,
    name,
    id,
    location,
    nhsnumber,
    sepsis: assessment.sepsis,
    covid: assessment.covid,
    denwis: assessment.denwis,
    news2: assessment.news2,
  };
}

const PatientDashboardTable: React.FC<{ patients: tPatientsList[] }> = ({
  patients,
}) => {
  const classes = useStyles();

  const rows = patients.map(
    ({ birthDate, gender, name, id, location, nhsnumber, assessment }) =>
      createData(birthDate, gender, name, id, location, nhsnumber, assessment),
  );
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down(600));
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              {!downSM && (
                <TableRow>
                  <TableCell colSpan={2} padding="checkbox"></TableCell>

                  <TableCell padding="none" align="center">
                    <Typography variant="caption">DENWIS</Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Typography variant="caption">COVID</Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Typography variant="caption">SEPSIS</Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Typography variant="caption">NEWS2</Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Typography variant="caption">ACTION</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <Row key={uniqid()} downSM={downSM} {...row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PatientDashboardTable;
