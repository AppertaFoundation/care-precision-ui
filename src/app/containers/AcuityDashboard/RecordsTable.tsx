/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { Helmet } from 'react-helmet-async';

import { patientsListFromSaga } from '../PatientList/saga';
import { sliceKey, reducer, actions } from '../PatientList/slice';
import {
  selectPatients,
  selectError,
  selectLoading,
  selectSearch,
  selectFilters,
} from '../PatientList/selectors';

import { Box, Toolbar } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Search, SortPoper, Sort, Spinner } from 'components';
import { useStyles } from '../PatientList/styles';

import PatientRecordTable from 'components/DashboardTable';

const RecordsList = () => {
  //redux configuration
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: patientsListFromSaga });
  const classes = useStyles();
  const ref = React.useRef(null);
  const muiTheme = useTheme();
  const xsSM = useMediaQuery(muiTheme.breakpoints?.between('xs', 'sm'));

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patients = useSelector(selectPatients);
  const search = useSelector(selectSearch);
  const filters = useSelector(selectFilters);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadRecords({}));
  });
  const handleSearch = React.useCallback(value => {
    dispatch(actions.search(value));
    dispatch(actions.loadRecords({ search: value }));
  }, []);
  const handleSortFilter = React.useCallback(filters => {
    dispatch(actions.addFilters(filters));
    dispatch(actions.loadRecords(filters));
  }, []);

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
          <Toolbar {...(xsSM ? {} : { className: classes.appBar })}>
            <Search onSearch={handleSearch} defaultValue={search} />
            <SortPoper>
              <Sort onFilterSort={handleSortFilter} defaultValues={filters} />
            </SortPoper>
          </Toolbar>
        </div>
        {patients?.length > 0 && (
          <>
            <Box m={1} mb={8} style={{ marginTop: '50px' }}>
              <PatientRecordTable patients={patients} />
            </Box>
          </>
        )}
      </>
    </>
  );
};
export default RecordsList;
