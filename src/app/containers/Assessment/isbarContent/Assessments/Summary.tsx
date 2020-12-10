import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingResult, selectErrorResult } from '../../selectors';
import { Grid, Box } from '@material-ui/core';
import { Dialog, Button } from 'components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { News2Summary } from './News2Summary';
import { SepsisSummary } from './SepsisSummary';
import styled from 'styled-components/macro';

const AssessmentSummary: React.FC<{
  open: boolean;
  handleClose: any;
  handleConfirm: any;
  obsType: string;
}> = ({ open, handleClose, handleConfirm, obsType }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints?.only('xs'));

  const error = useSelector(selectErrorResult);
  const isLoading = useSelector(selectLoadingResult);

  const summary = {
    news2: <News2Summary />,
    sepsis: <SepsisSummary />,
  }[obsType];
  const title = {
    news2: 'PATIENT MONITORING SUMMARY',
    sepsis: 'SEPSIS Screening (Pre- Hospital)',
    denwis: 'Concern Assessment (DENWIS)',
    covid: 'Covid Assessment Summary',
  }[obsType];
  if (isLoading) {
    <p>wait</p>;
  }
  if (error) {
    return <ErrorText>{repoErrorText(error)}</ErrorText>;
  }
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={title}
      fullScreen={xs}
      maxWidth="sm"
      fullWidth
      bottomActions={
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item>
            <Button.Secondary onClick={handleClose}>Cancel</Button.Secondary>
          </Grid>
          <Grid item>
            <Button.Success variant="contained" onClick={handleConfirm}>
              Confirm
            </Button.Success>
          </Grid>
        </Grid>
      }
    >
      <Box m={1}>{summary}</Box>
    </Dialog>
  );
};
export default AssessmentSummary;

export const repoErrorText = error => {
  switch (error) {
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;
