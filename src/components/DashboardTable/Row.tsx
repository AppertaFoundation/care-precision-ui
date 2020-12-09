import React, { useState } from 'react';

import MuiTableCell from '@material-ui/core/TableCell';
import { Box, IconButton, Typography, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IPatient, IAssessmentIcons } from 'types';

import {
  News2Icon,
  SepsisIcon,
  CovidIcon,
  DenwisIcon,
  ClickableElement,
  NewCareEventDialog,
} from 'components';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './style';

const TableCell = withStyles(() => ({
  body: {
    color: 'rgb(77, 77, 77)',
  },
}))(MuiTableCell);

export const Row: React.FC<
  IPatient & IAssessmentIcons & { downSM: boolean; key: string }
> = ({ downSM, ...patient }) => {
  const {
    name,
    id,
    location,
    nhsnumber,
    sepsis,
    covid,
    denwis,
    news2,
  } = patient;

  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handlePatientOverview = () => navigate(`/overview/${id}`);

  return (
    <>
      {downSM ? (
        <TableRow className={classes.row}>
          <TableCell colSpan={5} padding={'none'}>
            <ClickableElement onClick={handlePatientOverview}>
              <Box pl={1} pt={1} display="flex" flexDirection="row">
                <Box flexShrink={1}>
                  <Typography display="block" align="left" variant="body1">
                    {`${'Bed'}`}
                  </Typography>
                  <Typography display="block" align="left" variant="body1">
                    {`${'11'}`}
                  </Typography>
                </Box>
                <Box pl={1}>
                  <Typography
                    component="div"
                    noWrap
                    className={classes.subheader}
                  >
                    <Box mr={1} fontWeight="fontWeightBold">
                      {name}
                    </Box>
                  </Typography>{' '}
                  <Typography component="div" noWrap color="textSecondary">
                    <Box mr={1} fontWeight="fontWeightBold">
                      {nhsnumber}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </ClickableElement>
            <table>
              <tbody>
                <tr style={{ width: '100%' }}>
                  <TableCell
                    className={classes.cell}
                    padding="checkbox"
                    align="center"
                  >
                    <IconButton>
                      {denwis.value ? (
                        <DenwisIcon denwis={denwis.value} />
                      ) : (
                        <div style={{ width: 51, height: 23 }}>-</div>
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    className={classes.cell}
                    padding="checkbox"
                    align="center"
                  >
                    <IconButton>
                      {covid.value ? (
                        <CovidIcon value={covid.value} />
                      ) : (
                        <div style={{ width: 35, height: 23 }}>-</div>
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    padding="checkbox"
                    className={classes.cell}
                    align="center"
                  >
                    <IconButton>
                      {sepsis.value ? (
                        <SepsisIcon value={sepsis.value} />
                      ) : (
                        <div style={{ width: 24, height: 23 }}>-</div>
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    padding="checkbox"
                    align="center"
                    className={classes.cell}
                  >
                    <IconButton>
                      {news2.value ? (
                        <News2Icon news2={news2.value} />
                      ) : (
                        <div style={{ width: 51, height: 23 }}>-</div>
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    padding="checkbox"
                    align="center"
                    className={classes.cell}
                  >
                    <IconButton onClick={handleOpen}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </tr>
              </tbody>
            </table>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={id} className={classes.row}>
          <TableCell padding="checkbox" align="left" component="th" scope="row">
            <ClickableElement onClick={handlePatientOverview}>
              <Typography
                display="block"
                align="center"
                variant="body1"
              >{`${location}`}</Typography>
            </ClickableElement>
          </TableCell>
          <TableCell padding="checkbox" align="left">
            <ClickableElement onClick={handlePatientOverview}>
              <>
                <Typography
                  component="div"
                  noWrap
                  className={classes.subheader}
                >
                  <Box mr={1} fontWeight="fontWeightBold">
                    {name}
                  </Box>
                </Typography>{' '}
                <Typography component="div" noWrap color="textSecondary">
                  <Box mr={1} fontWeight="fontWeightBold">
                    {nhsnumber}
                  </Box>
                </Typography>{' '}
              </>
            </ClickableElement>
          </TableCell>

          <TableCell padding="checkbox" align="center">
            <IconButton>
              {denwis.value ? <DenwisIcon denwis={denwis.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="center">
            <IconButton>
              {covid.value ? <CovidIcon value={covid.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="center">
            <IconButton>
              {sepsis.value ? <SepsisIcon value={sepsis.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="center">
            <IconButton>
              {news2.value ? <News2Icon news2={news2.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="right">
            <IconButton onClick={handleOpen}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )}
      {open && id && (
        <NewCareEventDialog
          open={open}
          handleClose={handleClose}
          title={name}
          identifier={id}
        />
      )}
    </>
  );
};
