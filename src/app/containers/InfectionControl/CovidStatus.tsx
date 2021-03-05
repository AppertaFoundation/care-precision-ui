import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
  FormLabel,
} from '@material-ui/core';
import {
  selectCovidStatus,
  selectCovidStatusDate,
  selectResultCS,
  selectID,
} from './selectors';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './slice';
import { Button, NativeSelect, Dialog, DialogTitle, Spinner } from 'components';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function CovidStatus() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);

  const covidStatus = useSelector(selectCovidStatus);
  const covideUpdateDate = useSelector(selectCovidStatusDate);
  const id = useSelector(selectID);
  const result = useSelector(selectResultCS);
  const { pending, success, error } = result;

  React.useEffect(() => {
    if (success) {
      dispatch(actions.loadInfectionControl(id));
      setOpen(false);
    }
  }, [success, id, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onSubmit = data => dispatch(actions.pending(data));
  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: `${small ? 'auto' : large ? '245px' : '450px'}` }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <FormLabel component="legend">Covid Status</FormLabel>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                label="Current Covid Status"
                value={covidStatus || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name={'suspectedCovidStatus'}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="read-only-input-covid-date"
                label="Date Last Updated"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={covideUpdateDate || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                name="startTime"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box mt={1}>
            <Button.Secondary
              variant="outlined"
              color="secondary"
              onClick={handleOpen}
            >
              Update Status
            </Button.Secondary>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Update COVID Status
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && <p>{error}</p>}
          {pending && <Spinner />}

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Box p={1}>
                <form id="covid-status-form" onSubmit={handleSubmit(onSubmit)}>
                  <NativeSelect
                    id="covid-status-select"
                    options={[
                      { value: 'Positive', label: 'Positive' },

                      { value: 'Negative', label: 'Negative' },
                      { value: 'Recovered', label: 'Recovered' },
                      { value: 'Contact', label: 'Contact' },
                      { value: 'Symptoms', label: 'Symptoms' },
                    ]}
                    label="Current COVID Status"
                    name="suspectedCovidStatus"
                    control={control}
                    defaultValue={covidStatus || ''}
                  />
                </form>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item>
              <Button.Primary onClick={handleClose}>Cancel</Button.Primary>
            </Grid>
            <Grid item>
              <Button.Secondary
                variant="contained"
                type="submit"
                form="covid-status-form"
              >
                Confirm
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
