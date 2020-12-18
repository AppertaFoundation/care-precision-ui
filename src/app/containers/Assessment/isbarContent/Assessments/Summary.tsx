import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingResult, selectErrorResult } from '../../selectors';
import {
  Dialog as MuiDialog,
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const Dialog = withStyles({
  paper: {
    [breakpoints.up('sm')]: {
      borderRadius: '35px',
      padding: '15px',
    },
  },
})(MuiDialog);
const AssessmentSummary: React.FC<{
  open: boolean;
  handleClose: any;
  handleConfirm: any;
  obsType: string;
}> = ({ open, handleClose, handleConfirm, obsType }) => {
  const error = useSelector(selectErrorResult);
  const isLoading = useSelector(selectLoadingResult);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
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
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      scroll={'paper'}
    >
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers={true}>{summary}</DialogContent>
      <DialogActions>
        <Button.Primary onClick={handleClose} color="primary">
          Cancel
        </Button.Primary>
        <Button.Secondary onClick={handleConfirm} variant="contained">
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
