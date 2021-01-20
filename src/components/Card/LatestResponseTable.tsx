import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useStylesLastResponse } from './style';
import MuiIconButton from '@material-ui/core/Button';
import DenwisIcon from '../DenwisIcon';
import News2Icon from '../News2Icon';
import CovidIcon from '../CovidIcon';
import SepsisIcon from '../SepsisIcon';

const IconButtonNews2 = withStyles({
  root: {
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 0,
  },
})(MuiIconButton);

const LatestResponseTable = ({ assessments, sm, id }) => {
  const history = useHistory();
  const goToCovid = e => history.push(`/covid-menagment/${id}`);
  console.log(assessments, 'assessments');
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
              <IconButtonNews2
                onClick={() => console.log('denwis')}
                {...(sm ? { size: 'small' } : {})}
              >
                {assessments?.denwis?.value && (
                  <DenwisIcon denwis={assessments?.denwis?.value} />
                )}
              </IconButtonNews2>
            </td>
            <td>
              {' '}
              <IconButton
                onClick={goToCovid}
                {...(sm ? { size: 'small' } : {})}
              >
                {assessments?.covid?.value && (
                  <CovidIcon value={assessments?.covid?.value} />
                )}
              </IconButton>
            </td>
            <td>
              <IconButton
                onClick={() => console.log('sepsis')}
                {...(sm ? { size: 'small' } : {})}
              >
                {assessments?.sepsis?.value && (
                  <SepsisIcon value={assessments?.sepsis?.value} />
                )}
              </IconButton>
            </td>
            <td>
              {' '}
              <IconButtonNews2
                onClick={() => console.log('news2')}
                {...(sm ? { size: 'small' } : {})}
              >
                {assessments?.news2?.value && (
                  <News2Icon news2={assessments?.news2?.value} />
                )}
              </IconButtonNews2>{' '}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default LatestResponseTable;
