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

import { Box, List, Toolbar, Grid } from '@material-ui/core';
import {
  Card,
  CardContent,
  Search,
  SortPoper,
  Sort,
  Spinner,
} from 'components';
import { useStyles } from './styles';

const RecordsList = () => {
  //redux configuration
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: patientsListFromSaga });
  const classes = useStyles();
  const ref = React.useRef(null);

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
            <Box m={1} mb={8} style={{ marginTop: '50px' }}>
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
