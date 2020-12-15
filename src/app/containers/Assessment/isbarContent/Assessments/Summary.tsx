import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingResult, selectErrorResult } from '../../selectors';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { Button, Spinner } from 'components';
import { News2Summary } from './News2Summary';
import { SepsisSummary } from './SepsisSummary';
import { DenwisSummary } from './DenwisSummary';
import { CovidSummary } from './CovidSummary';
import styled from 'styled-components/macro';

const AssessmentSummary: React.FC<{
  open: boolean;
  handleClose: any;
  handleConfirm: any;
  obsType: string;
}> = ({ open, handleClose, handleConfirm, obsType }) => {
  const error = useSelector(selectErrorResult);
  const isLoading = useSelector(selectLoadingResult);

  const summary = {
    news2: <News2Summary />,
    sepsis: <SepsisSummary />,
    denwis: <DenwisSummary />,
    covid: <CovidSummary />,
  }[obsType];
  const title = {
    news2: 'PATIENT MONITORING SUMMARY',
    sepsis: 'SEPSIS Screening',
    denwis: 'Concern Assessment (DENWIS)',
    covid: 'Covid Assessment Summary',
  }[obsType];
  if (isLoading) {
    <Spinner />;
  }
  if (error) {
    return <ErrorText>{repoErrorText(error)}</ErrorText>;
  }
  return (
    <Dialog open={open} onClose={handleClose} scroll={'paper'}>
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers={true}>{summary}</DialogContent>
      <DialogActions>
        <Button.Primary onClick={handleClose} color="primary">
          Cancel
        </Button.Primary>
        <Button.Secondary onClick={handleClose} color="primary">
          Confirm
        </Button.Secondary>
      </DialogActions>
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
