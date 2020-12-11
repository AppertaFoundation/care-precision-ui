import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogContentText,
  Box,
  DialogActions,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, RadioGroup } from 'components';

const Monitor = () => {
  const [open, setOpen] = React.useState(false);
  const [other, setOther] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const methods = useForm({});
  const { watch, register, handleSubmit } = methods;

  const useEffectOnOther = (effect: React.EffectCallback) => {
    useEffect(effect, [watch('monitorTime')]);
  };
  useEffectOnOther(() => {
    const monitorTime = watch('monitorTime');
    setOther(monitorTime === 'other');
  });
  const onSubmit = data => {
    console.log(data, 'Monitor dialog');
    handleClose();
  };
  return (
    <Box m={1}>
      <Button.Secondary onClick={handleOpen} variant="outlined">
        Monitor
      </Button.Secondary>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography align="left">Request Observation Monitor Task</Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Patient News2 score was 3, we recommend you monitor the patient
            every 15 minutes
          </DialogContentText>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id="monitor-frequency">
              <Grid
                container
                direction="column"
                justify="space-around"
                // alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <RadioGroup
                    name="monitorTime"
                    label="Select Frequency:"
                    register={register}
                    values={[
                      {
                        id: '15',
                        value: 'Every 15 Minutes',
                      },
                      {
                        id: '30',
                        value: 'Every 30 Minutes',
                      },
                      {
                        id: '60',
                        value: 'Every 60 Minutes',
                      },
                      {
                        id: 'other',
                        value: 'Other',
                      },
                    ]}
                  />
                </Grid>
                {other && (
                  <Grid item>
                    <TextField
                      inputRef={register({
                        required: 'This field is required',
                      })}
                      InputLabelProps={{ shrink: true }}
                      name="other"
                      label="Other"
                      placeholder="Other"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">min</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </form>
          </FormProvider>
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
              <Button.Secondary onClick={handleClose}>Cancel</Button.Secondary>
            </Grid>
            <Grid item>
              <Button.Secondary
                variant="contained"
                form={`monitor-frequency`}
                type="submit"
              >
                Confirm
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Monitor;
