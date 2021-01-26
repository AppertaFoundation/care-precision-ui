import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';

import { Helmet } from 'react-helmet-async';
import uniqid from 'uniqid';

import { IconButton } from '@material-ui/core';
import {
  DenwisIcon,
  CovidIcon,
  SepsisIcon,
  NewCareEventDialog,
} from 'components';
import { patientListFromSaga } from '../PatientList/saga';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { sliceKey, actions, reducer } from '../PatientList/slice';
import {
  selectPatients,
  selectError,
  selectLoading,
  selectSearch,
  selectFilters,
} from '../PatientList/selectors';

import { Box, Toolbar, Grid, Typography, Divider } from '@material-ui/core';
import {
  Search,
  SortPoper,
  Sort,
  Spinner,
  Table,
  TdLast,
  TdFirst,
} from 'components';
import { useStyles } from '../PatientList/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const AcuityList = () => {
  //redux configuration
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: patientListFromSaga });
  const classes = useStyles();
  const ref = React.useRef(null);
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down(560));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const history = useHistory();

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patients = useSelector(selectPatients);
  const search = useSelector(selectSearch);
  const filters = useSelector(selectFilters);

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  React.useEffect(() => {
    dispatch(actions.loadRecords({}));
  }, [dispatch]);
  const handleSearch = React.useCallback(
    value => {
      dispatch(actions.search(value));
      dispatch(actions.loadRecords({ search: value }));
    },
    [dispatch],
  );
  const handleSortFilter = React.useCallback(
    filters => {
      dispatch(actions.addFilters(filters));
      dispatch(actions.loadRecords(filters));
    },
    [dispatch],
  );

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
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
              <Grid item xs={10} sm={6} md={3}>
                <Search onSearch={handleSearch} defaultValue={search} />
              </Grid>
              <Grid item>
                <SortPoper>
                  <Sort
                    onFilterSort={handleSortFilter}
                    defaultValues={filters}
                  />
                </SortPoper>
              </Grid>
            </Grid>
          </Toolbar>
        </div>
        {patients?.length > 0 && (
          <>
            <Box mb={8} style={{ marginTop: '50px' }}>
              {xs ? (
                <Typography>
                  Please switch the orientation of your device to horizontal
                </Typography>
              ) : (
                <Table>
                  {patients.map(
                    ({
                      name,
                      nhsnumber,

                      location,
                      assessment,
                      id,
                    }) => {
                      const goToCovid = e =>
                        history.push(`/covid-menagment/${id}`);
                      const redirectToPatientOverview = () =>
                        history.push(`/patient-overview/${id}`);
                      return (
                        <React.Fragment key={uniqid()}>
                          <tr
                            style={{ backgroundColor: '#fff' }}
                            onClick={redirectToPatientOverview}
                          >
                            <TdFirst>{location}</TdFirst>
                            <td
                              style={{
                                paddingTop: '15px',
                                paddingBottom: '15px',
                              }}
                              onClick={redirectToPatientOverview}
                            >
                              <Typography variant="subtitle2" display="block">
                                {name}
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                {nhsnumber}
                              </Typography>
                            </td>
                            <td>
                              {' '}
                              <IconButton
                                onClick={() => console.log('denwis')}
                                {...(sm ? { size: 'small' } : {})}
                              >
                                {assessment?.denwis?.value && (
                                  <DenwisIcon
                                    denwis={assessment?.denwis?.value}
                                  />
                                )}
                              </IconButton>
                            </td>
                            <td>
                              {' '}
                              <IconButton
                                onClick={goToCovid}
                                {...(sm ? { size: 'small' } : {})}
                              >
                                {assessment?.covid?.value && (
                                  <CovidIcon value={assessment?.covid?.value} />
                                )}
                              </IconButton>
                            </td>
                            <td>
                              {' '}
                              <IconButton
                                onClick={() => console.log('sepsis')}
                                {...(sm ? { size: 'small' } : {})}
                              >
                                {assessment?.sepsis?.value && (
                                  <SepsisIcon
                                    value={assessment?.sepsis?.value}
                                  />
                                )}
                              </IconButton>
                            </td>
                            <td>
                              {' '}
                              <IconButton
                                onClick={() => console.log('denwis')}
                                {...(sm ? { size: 'small' } : {})}
                              >
                                {assessment?.denwis?.value && (
                                  <DenwisIcon
                                    denwis={assessment?.denwis?.value}
                                  />
                                )}
                              </IconButton>
                            </td>
                            <td>Action</td>
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
                  )}
                </Table>
              )}
            </Box>
          </>
        )}
      </>
    </>
  );
};
export default AcuityList;
