import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingResult, selectErrorResult } from '../../selectors';
import { DialogContent } from '@material-ui/core';
import {
  Button,
  Spinner,
  Dialog,
  DialogTitle,
  DialogActions,
} from 'components';
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="scroll-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers={true}>
        {summary}
        {isLoading && <Spinner />}
        {error && <ErrorText>{repoErrorText(error)}</ErrorText>}
      </DialogContent>
      <DialogActions>
        <Button.Primary onClick={handleClose} color="primary">
          Cancel
        </Button.Primary>
        <Button.Secondary
          onClick={handleConfirm}
          variant="contained"
          disabled={Boolean(error)}
        >
          Confirm
        </Button.Secondary>
      </DialogActions>
    </Dialog>
  );
};
export default AssessmentSummary;

export const repoErrorText = error => {
  switch (error) {
    case 2:
      return 'There is no result, close dialog and try again';
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;
