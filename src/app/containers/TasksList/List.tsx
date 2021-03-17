import React from 'react';

import { Helmet } from 'react-helmet-async';
import uniqid from 'uniqid';

import { IconButton, Checkbox, FormControlLabel } from '@material-ui/core';
import { NewCareEventDialog } from 'components';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  Box,
  Toolbar,
  Grid,
  Typography,
  Divider,
  Badge,
} from '@material-ui/core';
import { Table, TdLast, TdFirst } from 'components';
import { useStyles } from '../PatientList/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { fake } from 'utils/fake';
import Status from './Status';
import TaskType from './TaskType';
import Task from './Task';
import { formatTime, formatDate } from 'utils/formatters/time';
import StatusDialog from './Status/StatusDialog';
import Search from '../SearchPatientRecord';

// type Order = 'ASC' | 'DESC';

const TasksList = () => {
  //redux configuration

  const classes = useStyles();
  const ref = React.useRef(null);
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down(560));
  const history = useHistory();

  const [open, setOpen] = React.useState<boolean>(false);
  const [openStatusDialog, setOpenStatusDialog] = React.useState<boolean>(
    false,
  );
  const [taskStatus, setTaskStatus] = React.useState('');
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [showCompleted, setShowCompleted] = React.useState(false);

  const { TASKS } = fake;
  const removeCompleted = () =>
    TASKS.filter(task => task.status !== 'COMPLETED');

  const handleChangeShow = () => setShowCompleted(!showCompleted);
  const handleOpenStatusDialog = status => {
    setOpenStatusDialog(true);
    setTaskStatus(status);
  };
  const handleCloseStatusDialog = () => setOpenStatusDialog(false);
  return (
    <>
      <Helmet>
        <title>{'Patient List'}</title>
        <meta name="description" content={'A Patient List'} />
      </Helmet>
      <>
        <div className={classes.fixed} ref={ref}>
          <Toolbar>
            <Grid
              direction="row"
              alignItems="center"
              justify={'flex-end'}
              container
            >
              <Grid item>
                <Box m={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showCompleted}
                        onChange={handleChangeShow}
                        name="ShowCompleted"
                        color="primary"
                      />
                    }
                    label="Show Completed"
                  />
                </Box>
              </Grid>
              <Grid item xs={10} sm={7} md={3}>
                <Search />
              </Grid>
            </Grid>
          </Toolbar>
        </div>

        <>
          <Box mb={8} style={{ marginTop: '50px' }}>
            {xs ? (
              <Typography>
                Please switch the orientation of your device to horizontal
              </Typography>
            ) : (
              <>
                <Table.Tasks>
                  {TASKS.length > 0 ? (
                    (showCompleted ? TASKS : removeCompleted()).map(
                      (
                        {
                          name,
                          nhsnumber,
                          status,
                          id,
                          actionDate,
                          action,
                          delayed,
                        },
                        index,
                      ) => {
                        const redirectToPatientOverview = () =>
                          history.push(`/patient-overview/${id}`);
                        return (
                          <React.Fragment key={uniqid()}>
                            <tr
                              style={{
                                backgroundColor: `${
                                  delayed ? 'rgb(255, 0, 0, 25%)' : '#fff'
                                }`,
                              }}
                            >
                              <TdFirst
                                onClick={redirectToPatientOverview}
                                style={{
                                  paddingTop: '15px',
                                  paddingBottom: '15px',
                                }}
                              >
                                <Typography variant="subtitle2" display="block">
                                  {name}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                >
                                  {nhsnumber}
                                </Typography>
                              </TdFirst>

                              <Td onClick={redirectToPatientOverview}>
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                >
                                  Room: 02
                                </Typography>{' '}
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                  display="block"
                                >
                                  {`Bed: 0${index + 1}`}
                                </Typography>
                              </Td>
                              <Td>
                                <Task taskType={action.type}>
                                  {formatDate(actionDate)}
                                </Task>
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                >
                                  {formatTime(actionDate)}
                                </Typography>
                              </Td>
                              <Td>
                                <TaskType>{action.type}</TaskType>
                              </Td>
                              <Td>
                                <Task taskType={action.type}>
                                  {action.value}
                                </Task>
                              </Td>
                              <Td>
                                <Badge
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                  }}
                                  badgeContent={'DELAYED'}
                                  color="error"
                                  invisible={!delayed}
                                >
                                  <Status
                                    onClick={() =>
                                      handleOpenStatusDialog(status)
                                    }
                                    status={status}
                                  />
                                </Badge>
                              </Td>
                              <TdLast>
                                <Divider orientation="vertical" flexItem />
                                <IconButton edge={'end'} onClick={handleOpen}>
                                  <MoreVertIcon />
                                </IconButton>
                              </TdLast>
                            </tr>
                            {open && (
                              <NewCareEventDialog
                                open={open}
                                handleClose={handleClose}
                                title={name}
                                identifier={nhsnumber || ''}
                                id={id || ''}
                              />
                            )}
                          </React.Fragment>
                        );
                      },
                    )
                  ) : (
                    <Typography>There are no such records</Typography>
                  )}
                </Table.Tasks>
                {openStatusDialog && (
                  <StatusDialog
                    open={openStatusDialog}
                    handleClose={handleCloseStatusDialog}
                    status={taskStatus}
                  />
                )}
              </>
            )}
          </Box>
        </>
      </>
    </>
  );
};
export default TasksList;

const Td = styled.td`
  text-align: center;
  cursor: pointer;
  max-width: 112px;
`;
