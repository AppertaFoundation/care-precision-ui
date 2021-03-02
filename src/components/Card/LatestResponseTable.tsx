import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DenwisIcon from '../DenwisIcon';
import News2Icon from '../News2Icon';
import CovidIcon from '../CovidIcon';
import SepsisIcon from '../SepsisIcon';

const LatestResponseTable = ({ assessments, sm, id }) => {
  const history = useHistory();
  const goToCovid = e => history.push(`/covid-management/${id}`);
  return (
    <Box mr={1} width="100%">
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>DENWIS</th>
            <th>COVID</th>
            <th>SEPSIS</th>
            <th>NEWS2</th>
            <th> {sm ? 'A.' : 'Action'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {assessments?.denwis?.value && (
                <DenwisIcon denwis={assessments?.denwis?.value} />
              )}
            </td>
            <td>
              {assessments?.covid?.value && (
                <CovidIcon value={assessments?.covid?.value} />
              )}
            </td>
            <td>
              {assessments?.sepsis?.value && (
                <SepsisIcon value={assessments?.sepsis?.value} />
              )}
            </td>
            <td>
              {assessments?.news2?.value && (
                <News2Icon news2={assessments?.news2?.value} />
              )}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default LatestResponseTable;
