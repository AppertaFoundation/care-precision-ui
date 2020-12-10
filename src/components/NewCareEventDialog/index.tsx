import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@material-ui/core';
import Button from '../Button';
import { setAssessmentType } from 'store/assessmentTypeReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {
  open: boolean;
  title?: string;
  id: string;
  identifier: string;
  handleClose: () => void;
}
const NewCareEventDialog: React.FC<Props> = ({
  open,
  handleClose,
  title = '',
  identifier,
  id,
}) => {
  const [path, setPath] = React.useState<never | string>();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, [path]);
  };

  useEffectOnMount(() => {
    if (path) {
      navigate(path);
    }
  });

  const handleRedirect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    const { value } = event.currentTarget as HTMLButtonElement;
    setPath(`/assessment/${id}/0/${value}`);
    navigate(`/assessment/${id}/0/${value}`, { replace: true });
    dispatch(setAssessmentType(value));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirectToProfile = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    navigate(`/patient-overview/${identifier}`, { replace: true });
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Grid item>
            <Typography align="center">New Care Event for</Typography>
          </Grid>
          <Grid item>
            <Typography align="center">{title}</Typography>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="news2"
              fullWidth
              width={200}
            >
              Observation
            </Button.Primary>
          </Grid>
          <Grid item xs={12}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="denwis"
              fullWidth
              width={200}
            >
              Concern Assessment
            </Button.Primary>
          </Grid>
          <Grid item xs={12}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="sepsis"
              fullWidth
              width={200}
            >
              SEPSIS Screening
            </Button.Primary>
          </Grid>
          <Grid item xs={12}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="covid"
              fullWidth
              width={200}
            >
              COVID Assessment
            </Button.Primary>
          </Grid>
          <Grid item xs={12}>
            <Button.Primary
              onClick={handleRedirectToProfile}
              variant="outlined"
              value="patient-overview"
              fullWidth
              width={200}
            >
              Patient Details
            </Button.Primary>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default NewCareEventDialog;
