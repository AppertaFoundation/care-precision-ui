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

import { Box } from '@material-ui/core';
import { Search, SortPoper, Sort } from 'components';
import { ToolBar } from '../PatientList/ToolBar';
import PatientRecordTable from 'components/DashboardTable';

const RecordsList = () => {
  //redux configuration
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: patientsListFromSaga });

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
    return <p>loading</p>;
  }
  return (
    <>
      <Helmet>
        <title>{'Patient List'}</title>
        <meta name="description" content={'A Patient List'} />
      </Helmet>
      <>
        {patients?.length > 0 && (
          <>
            <ToolBar>
              <Search onSearch={handleSearch} defaultValue={search} />
              <SortPoper>
                <Sort onFilterSort={handleSortFilter} defaultValues={filters} />
              </SortPoper>
            </ToolBar>
            <Box m={1} mb={8}>
              <PatientRecordTable patients={patients} />
            </Box>
          </>
        )}
      </>
    </>
  );
};
export default RecordsList;
