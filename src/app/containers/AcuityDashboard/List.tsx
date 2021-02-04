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
  News2Icon,
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
import styled from 'styled-components';

type Order = 'ASC' | 'DESC';

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

  const [order, setOrder] = React.useState<Order>('DESC');
  const [orderBy, setOrderBy] = React.useState<string>('news2');

  React.useEffect(() => {
    dispatch(actions.loadRecords({ sort: { value: 'DESC', key: 'news2' } }));
  }, [dispatch]);

  React.useEffect(() => {
    if (
      (filters?.sort?.value && filters?.sort?.value !== order) ||
      filters?.sort?.key !== orderBy
    ) {
      setOrder(filters?.sort?.value);
      setOrderBy(filters?.sort?.value);
    }
  }, [dispatch, filters, order, orderBy]);
  const handleSearch = React.useCallback(
    value => {
      dispatch(actions.search(value));
      dispatch(actions.loadRecords({ search: value }));
    },
    [dispatch],
  );
  const handleRequestSort = React.useCallback(
    newFilters => {
      dispatch(actions.addFilters(newFilters));
      dispatch(actions.loadRecords(newFilters));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (filters?.sort?.value) {
      setOrder(filters?.sort?.value);
    }
    if (filters?.sort?.key) {
      setOrderBy(filters?.sort?.key);
    }
  }, [filters]);

  React.useEffect(() => {
    dispatch(
      actions.addFilters({
        sort: { value: order, key: orderBy },
        filter: null,
      }),
    );
    dispatch(
      actions.loadRecords({
        sort: { value: order, key: orderBy },
        filter: null,
      }),
    );
  }, [dispatch, orderBy, order]);

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
                    onFilterSort={handleRequestSort}
                    defaultValues={filters}
                  />
                </SortPoper>
              </Grid>
            </Grid>
          </Toolbar>
        </div>

        {error && <p>{error}</p>}
        {isLoading && <Spinner />}
        {patients?.length > 0 && (
          <>
            <Box mb={8} style={{ marginTop: '50px' }}>
              {xs ? (
                <Typography>
                  Please switch the orientation of your device to horizontal
                </Typography>
              ) : (
                <Table
                  onRequestSort={handleRequestSort}
                  order={filters?.sort?.value}
                  orderBy={filters?.sort?.key}
                  filters={filters}
                >
                  {patients.map(
                    ({
                      name,
                      nhsnumber,

                      location,
                      assessment,
                      id,
                    }) => {
                      const goToCovid = e =>
                        history.push(`/covid-management/${id}`);
                      const redirectToPatientOverview = () =>
                        history.push(`/patient-overview/${id}`);
                      return (
                        <React.Fragment key={uniqid()}>
                          <tr style={{ backgroundColor: '#fff' }}>
                            <TdFirst onClick={redirectToPatientOverview}>
                              {location}
                            </TdFirst>
                            <Td
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
                            </Td>
                            <Td>
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
                            </Td>
                            <Td>
                              <IconButton
                                onClick={goToCovid}
                                {...(sm ? { size: 'small' } : {})}
                              >
                                {assessment?.covid?.value && (
                                  <CovidIcon value={assessment?.covid?.value} />
                                )}
                              </IconButton>
                            </Td>
                            <Td>
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
                            </Td>
                            <Td>
                              <IconButton
                                onClick={() => console.log('denwis')}
                                {...(sm ? { size: 'small' } : {})}
                              >
                                {assessment?.news2?.value && (
                                  <News2Icon news2={assessment?.news2?.value} />
                                )}
                              </IconButton>
                            </Td>
                            <Td>Action</Td>
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

const Td = styled.td`
  text-align: center;
  cursor: pointer;
`;
