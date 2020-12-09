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
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {!downSM && (
                <TableCell colSpan={2} padding="checkbox"></TableCell>
              )}
              <TableCell padding="checkbox" align="center">
                <Typography noWrap variant="subtitle2">
                  DENWIS
                </Typography>
              </TableCell>
              <TableCell padding="checkbox" align="center">
                <Typography noWrap variant="subtitle2">
                  COVID
                </Typography>
              </TableCell>
              <TableCell padding="checkbox" align="center">
                <Typography noWrap variant="subtitle2">
                  SEPSIS
                </Typography>
              </TableCell>
              <TableCell padding="checkbox" align="center">
                <Typography noWrap variant="subtitle2">
                  NEWS2
                </Typography>
              </TableCell>
              <TableCell padding="checkbox" align="center">
                <Typography noWrap variant="subtitle2">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={uniqid()} downSM={downSM} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PatientDashboardTable;
