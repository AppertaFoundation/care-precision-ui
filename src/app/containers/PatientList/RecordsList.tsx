/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { Helmet } from 'react-helmet-async';
import uniqid from 'uniqid';

import { patientsListFromSaga } from './saga';
import { sliceKey, reducer, actions } from './slice';
import {
  selectPatients,
  selectError,
  selectLoading,
  selectSearch,
  selectFilters,
} from './selectors';

import { Box, List } from '@material-ui/core';
import { Card, CardContent, Search, SortPoper, Sort } from 'components';
import { ToolBar } from './ToolBar';

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
              <List>
                {patients.map(
                  ({
                    name,
                    nhsnumber,
                    birthDate,
                    gender,
                    location,
                    assessment,
                    id,
                  }) => (
                    <Box key={uniqid()}>
                      <Card
                        name={name}
                        identifier={nhsnumber}
                        assesments={assessment}
                        id={id}
                      >
                        <CardContent
                          birthDate={birthDate}
                          gender={gender}
                          location={location}
                        />
                      </Card>
                    </Box>
                  ),
                )}
              </List>
            </Box>
          </>
        )}
      </>
    </>
  );
};
export default RecordsList;
