import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  Box,
  Chip,
  FormLabel,
} from '@material-ui/core';
import { Button, Dialog, DialogTitle } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../slice';
import { makeStyles } from '@material-ui/styles';
import { selectInterventionAction } from '../../../selectors';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: '280px',
    margin: '0 auto',
  },
  form: {
    borderBottomColor: '#DADADA',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderRadius: '0px 0px 15px 15px',
    marginBottom: '50px',
  },
}));
const Intervention: React.FC = () => {
  const classess = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('');

  const dispatch = useDispatch();
  const interventionAction = useSelector(selectInterventionAction);

  React.useEffect(() => {
    if (interventionAction) {
      setSelected(interventionAction);
    } else {
      setSelected('');
    }
  }, [interventionAction]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleChange = (e, type, recomendation) => {
    const value = e.target.textContent;
    setSelected(selected === value ? '' : value);
    dispatch(actions.clearIntervention());
    dispatch(
      actions.addResponse({
        type: type,
        recommendation: selected === value ? null : recomendation,
      }),
    );
    dispatch(actions.clearNoAction());
    e.currentTarget.blur();
    e.target.blur();
  };

  const covidPathway = event => {
    handleChange(event, 'covidPathway', { recomendation: 'Suspected Covid' });
  };

  const internalEscalation = event => {
    handleChange(event, 'internalEscalation', {
      recomendation: 'Internal Escalation',
    });
  };

  const ambulance = event => {
    handleChange(event, 'externalEscalation', { recomendation: 'Ambulance' });
  };
  const gpAdvaice = event => {
    handleChange(event, 'externalEscalation', {
      recomendation: '111/GP Advaice',
    });
  };
  return (
    <Box m={1}>
      <Button.Primary
        onClick={handleOpen}
        variant={interventionAction ? 'contained' : 'outlined'}
      >
        INTERVENTION
      </Button.Primary>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography align="center">Intervantion</Typography>
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs>
              <FormLabel component="legend">Covid Pathway</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(selected === 'Suspected Covid'
                  ? {}
                  : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'Suspected Covid'}
                onClick={covidPathway}
                className={classess.root}
              />
            </Grid>
            <Grid item xs>
              <FormLabel component="legend">Internal Escalation</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(selected === 'Internal Escalation'
                  ? {}
                  : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'Internal Escalation'}
                onClick={internalEscalation}
                className={classess.root}
              />
            </Grid>
            <Grid item xs>
              <FormLabel component="legend">External Escalation</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(selected === 'Ambulance' ? {} : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'Ambulance'}
                onClick={ambulance}
                className={classess.root}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(selected === '111/GP Advaice'
                  ? {}
                  : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'111/GP Advaice'}
                onClick={gpAdvaice}
                className={classess.root}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default Intervention;
