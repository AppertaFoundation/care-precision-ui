import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  Box,
  Chip,
  FormLabel,
} from '@material-ui/core';
import { Button, Dialog, DialogTitle, DialogActions } from 'components';
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
  const [selected, setSelected] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const interventionAction = useSelector(selectInterventionAction);

  React.useEffect(() => {
    if (interventionAction && interventionAction.length > 0) {
      setSelected(interventionAction);
    } else {
      setSelected([]);
    }
  }, [interventionAction]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const isSelected = value => {
    return selected.includes(value);
  };
  const addElement = value => {
    const newTable = [value, ...selected];
    setSelected(newTable);
    return newTable;
  };
  const removeElement = value => {
    const newTable = selected.filter(o => o !== value);
    setSelected(newTable);
    return newTable;
  };

  const handleChange = e => {
    const value = e.target.textContent;
    isSelected(value) ? removeElement(value) : addElement(value);
    e.currentTarget.blur();
    e.target.blur();
  };

  const ACTIONS_KEYS = action =>
    ({
      'Suspected Covid': 'covidPathway',
      'Internal Escalation': 'internalEscalation',
      '111/GP Advice': 'externalEscalation',
      Ambulance: 'externalEscalation',
    }[action]);
  const handleSubmit = () => {
    interface interventionObject {
      externalEscalation;
    }
    const intervention: interventionObject = {
      externalEscalation: { recomendation: [] },
    };
    dispatch(actions.clearIntervention());
    selected.forEach((action: string) => {
      if (ACTIONS_KEYS(action) === 'externalEscalation') {
        intervention.externalEscalation.recomendation = [
          action,
          ...intervention.externalEscalation.recomendation,
        ];
      } else {
        intervention[`${ACTIONS_KEYS(action)}`] = { recomendation: action };
      }
    });
    if (intervention.externalEscalation.recomendation.length === 0) {
      intervention.externalEscalation = null;
    }
    dispatch(actions.addIntervention(intervention));
    dispatch(actions.clearNoAction());
    handleClose();
  };
  return (
    <Box m={1}>
      <Button.Primary
        onClick={handleOpen}
        variant={interventionAction.length > 0 ? 'contained' : 'outlined'}
      >
        INTERVENTION
      </Button.Primary>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography align="center">Intervention</Typography>
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
                {...(isSelected('Suspected Covid')
                  ? {}
                  : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'Suspected Covid'}
                onClick={handleChange}
                className={classess.root}
              />
            </Grid>
            <Grid item xs>
              <FormLabel component="legend">Internal Escalation</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(isSelected('Internal Escalation')
                  ? {}
                  : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'Internal Escalation'}
                onClick={handleChange}
                className={classess.root}
              />
            </Grid>
            <Grid item xs>
              <FormLabel component="legend">External Escalation</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(isSelected('Ambulance') ? {} : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'Ambulance'}
                onClick={handleChange}
                className={classess.root}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                {...(isSelected('111/GP Advice')
                  ? {}
                  : { variant: 'outlined' })}
                color="primary"
                size="small"
                label={'111/GP Advice'}
                onClick={handleChange}
                className={classess.root}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button.Primary onClick={handleClose} color="primary">
            Cancel
          </Button.Primary>
          <Button.Secondary variant="contained" onClick={handleSubmit}>
            Confirm
          </Button.Secondary>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Intervention;
