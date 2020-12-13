import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import uniqid from 'uniqid';

export const mapCirleParametrColor = score => {
  return {
    '3': '#F40013',
    '2': '#FBC384',
    '1': '#fbf184',
    '0': '#2E7D32',
  }[score];
};
export const mapScoreParametrColor = score => (score === 3 ? '#fff' : '#000');
const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  root: {
    padding: 0,
  },
});
const TableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    fontSize: 10,
    lineHeight: 1.5,
  },
}))(MuiTableCell);

const Cell: React.FC<{
  ordinal: number;
  value: string;
  units?: string;
  border?: boolean;
}> = ({ ordinal, value, units, border }) => {
  return (
    <TableCell
      key={uniqid()}
      style={{
        border: '2px solid #E0E0E0',
        backgroundColor: `${mapCirleParametrColor(ordinal)}`,
        color: `${mapScoreParametrColor(ordinal)}`,
        borderRight: `${border ? '2px solid #fff' : 'none'}`,
        width: '100px',
      }}
      align="center"
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
            {value}
          </Box>
        </Grid>
        <Grid item>{units || '.'}</Grid>
      </Grid>
    </TableCell>
  );
};

const VitalSignsTable = ({ news2, flowRate }) => {
  const classes = useStyles();
  return (
    <TableContainer style={{ backgroundColor: '#E0E0E0' }} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              key={uniqid()}
              className={classes.root}
              style={{
                backgroundColor: '#515F9C',
                color: '#fff',
                height: '20px',
                borderRight: '2px solid #fff',
              }}
              align="center"
              colSpan={3}
            >
              <Box fontSize={12} fontWeight="fontWeightBold">
                A + B
              </Box>
            </TableCell>
            <TableCell
              key={uniqid()}
              className={classes.root}
              style={{
                backgroundColor: '#515F9C',
                color: '#fff',
                height: '20px',
                borderRight: '2px solid #fff',
              }}
              align="center"
              colSpan={2}
            >
              <Box fontSize={12} fontWeight="fontWeightBold">
                C{' '}
              </Box>
            </TableCell>
            <TableCell
              key={uniqid()}
              className={classes.root}
              style={{
                backgroundColor: '#515F9C',
                color: '#fff',
                height: '20px',
                borderRight: '2px solid #fff',
              }}
              align="center"
              colSpan={2}
            >
              <Box fontSize={12} fontWeight="fontWeightBold">
                D + E{' '}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell key={uniqid()} align="center">
              {'Respiration Rate'}
            </TableCell>
            <TableCell key={uniqid()} align="center">
              {'Saturation'}
            </TableCell>
            <TableCell
              key={uniqid()}
              style={{
                borderRight: '2px solid #fff',
              }}
              align="center"
            >
              {'Flow Rate'}
            </TableCell>
            <TableCell key={uniqid()} align="center">
              {'Blood Preassure'}
            </TableCell>
            <TableCell
              key={uniqid()}
              style={{
                borderRight: '2px solid #fff',
              }}
              align="center"
            >
              {'Pulse Rate'}
            </TableCell>
            <TableCell key={uniqid()} align="center">
              {'Consciousness'}
            </TableCell>
            <TableCell
              key={uniqid()}
              style={{
                borderRight: '2px solid #fff',
              }}
              align="center"
            >
              {'Temperature'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Cell
              ordinal={news2?.respirationRate?.ordinal}
              value={news2?.respirationRate?.value}
              units={'bpm'}
            />
            <Cell
              ordinal={news2?.spoScale_1?.ordinal}
              value={news2?.spoScale_1?.value}
              units={'%'}
            />
            <Cell ordinal={0} value={flowRate || '-'} units={'l/min'} border />
            <Cell
              ordinal={news2?.systolicBloodPressure?.ordinal}
              value={`${news2?.systolicBloodPressure?.value}`}
              units={'%'}
            />
            <Cell
              ordinal={news2?.pulse?.ordinal}
              value={news2?.pulse?.value}
              units={'bpm'}
              border
            />
            <Cell
              ordinal={news2?.consciousness?.ordinal}
              value={news2?.consciousness?.value}
              units={'.'}
            />
            <Cell
              ordinal={news2?.temperature?.ordinal}
              value={news2?.temperature?.value}
              units={'`C'}
              border
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VitalSignsTable;
