import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  Divider,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../Button';
import Dialog from '../Dialog';
import { DialogTitle } from '../Dialog/DialogTitle';
import { setAssessmentType } from 'store/assessmentTypeReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  content: { padding: 24 },
});
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
  const classes = useStyles();
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

  const redirectToProfile = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    navigate(`/patient-overview/${id}`, { replace: true });
  };
  const startCovidPathway = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    navigate(`/covid-menagment/${id}`, { replace: true });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="title" onClose={handleClose}>
        <Typography component="div" noWrap variant="h5">
          {title}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {identifier}
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={startCovidPathway}
              variant="outlined"
              fullWidth
            >
              Covid Pathway
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={redirectToProfile}
              variant="outlined"
              fullWidth
            >
              Patient Details
            </Button.Primary>
          </Grid>
        </Grid>
        <Box mt={3} mb={3}>
          <Divider variant="middle" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              New Care Event:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="news2"
              fullWidth
            >
              Observation
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="denwis"
              fullWidth
            >
              Concern
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="sepsis"
              fullWidth
            >
              SEPSIS Screening
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            {' '}
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="covid"
              fullWidth
            >
              COVID Assessment
            </Button.Primary>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default NewCareEventDialog;
