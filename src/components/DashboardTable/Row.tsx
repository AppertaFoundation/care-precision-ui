import React, { useState } from 'react';

import {
  Box,
  IconButton,
  Typography,
  TableRow,
  FormLabel,
  TableCell,
} from '@material-ui/core';
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
import { Home } from './assets/Home';

import { useStyles } from './style';

export const Row: React.FC<
  IPatient & IAssessmentIcons & { downSM: boolean; key: string }
> = ({ downSM, ...patient }) => {
  const {
    name,
    id,
    // location,
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
        <TableRow>
          <TableCell padding={'none'}>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.table}>
                  <TableCell padding="checkbox" className={classes.cell}>
                    <Home />
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.cell}>
                    <Typography component="div" noWrap variant="h6">
                      <Box mr={1} fontWeight="fontWeightBold">
                        {name}
                      </Box>
                    </Typography>
                    <Typography component="div" noWrap variant="body1">
                      <Box mr={1} fontWeight="fontWeightBold">
                        {nhsnumber}
                      </Box>
                    </Typography>
                  </TableCell>

                  <TableCell padding="checkbox" className={classes.cell}>
                    <IconButton onClick={handleOpen}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </tr>
              </tbody>
            </table>

            <table className={classes.table}>
              <tbody>
                <tr className={classes.table}>
                  <td className={classes.xsCell}>
                    <FormLabel component="legend">DENWIS</FormLabel>

                    <IconButton className={classes.xsCellButton}>
                      {denwis.value ? (
                        <DenwisIcon denwis={denwis.value} />
                      ) : (
                        <div className={classes.xsCell}>-</div>
                      )}
                    </IconButton>
                  </td>
                  <td className={classes.xsCell}>
                    <FormLabel component="legend">COVID</FormLabel>

                    <IconButton className={classes.xsCellButton}>
                      {covid.value ? (
                        <CovidIcon value={covid.value} />
                      ) : (
                        <div className={classes.xsCell}>-</div>
                      )}
                    </IconButton>
                  </td>
                  <td className={classes.xsCell}>
                    <FormLabel component="legend">SEPSIS</FormLabel>

                    <IconButton className={classes.xsCellButton}>
                      {sepsis.value ? (
                        <SepsisIcon value={sepsis.value} />
                      ) : (
                        <div className={classes.xsCell}>-</div>
                      )}
                    </IconButton>
                  </td>
                  <td className={classes.xsCell}>
                    <FormLabel component="legend">NEWS2</FormLabel>

                    <IconButton className={classes.xsCellButton}>
                      {news2.value ? (
                        <News2Icon news2={news2.value} />
                      ) : (
                        <div className={classes.xsCell}>-</div>
                      )}
                    </IconButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={id}>
          <TableCell padding="checkbox" align="left" component="th" scope="row">
            <ClickableElement onClick={handlePatientOverview}>
              <Home />
            </ClickableElement>
          </TableCell>
          <TableCell padding="checkbox" align="left">
            <ClickableElement onClick={handlePatientOverview}>
              <>
                <Typography component="div" noWrap variant="h6">
                  <Box mr={1} fontWeight="fontWeightBold">
                    {name}
                  </Box>
                </Typography>{' '}
                <Typography component="div" noWrap variant="body1">
                  <Box mr={1} fontWeight="fontWeightBold">
                    {nhsnumber}
                  </Box>
                </Typography>
              </>
            </ClickableElement>
          </TableCell>

          <TableCell padding="checkbox" align="left">
            <IconButton>
              {denwis.value ? <DenwisIcon denwis={denwis.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="left">
            <IconButton>
              {covid.value ? <CovidIcon value={covid.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="left">
            <IconButton>
              {sepsis.value ? <SepsisIcon value={sepsis.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="left">
            <IconButton>
              {news2.value ? <News2Icon news2={news2.value} /> : ''}
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox" align="left">
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
          identifier={nhsnumber}
          id={id}
        />
      )}
    </>
  );
};
