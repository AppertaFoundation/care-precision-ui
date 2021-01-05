import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormLabel,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  selectIsolationStatus,
  selectIsolationReason,
  selectCovidStatusDate,
  selectEndOfIsolation,
  selectIsolationDays,
  selectDayOfIsolation,
} from './selectors';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Dialog, NativeSelect, DialogTitle } from 'components';
import { useForm } from 'react-hook-form';

export function IsolationStatus() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));
  const isolationReason = useSelector(selectIsolationReason);
  const isolationStatus = useSelector(selectIsolationStatus);
  const updateDate = useSelector(selectCovidStatusDate);
  const isolationEnd = useSelector(selectEndOfIsolation);
  const isolationDays = useSelector(selectIsolationDays);
  const dayOfIsolation = useSelector(selectDayOfIsolation);

  const { control } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: `${small ? 'auto' : large ? '245px' : '450px'}` }}
      >
        <Grid item>
          <Grid container justify="flex-start" alignItems="stretch" spacing={2}>
            <Grid item xs={12}>
              <FormLabel component="legend">Isolation Status</FormLabel>
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="read-only-input-isolation-days"
                label="Current Isolation Status"
                value={isolationStatus || ''}
                // defaultValue={isolationStatus}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="outlined-read-only-input"
                label="Isolation Reason"
                value={isolationReason || ''}
                // defaultValue={isolationReason}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="read-only-input-isolation-date"
                label="Last Updated"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={updateDate || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="outlined-read-only-input"
                label="Isolation End Date"
                type="date"
                value={isolationEnd || ''}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                <Box fontWeight={500}>
                  {dayOfIsolation && isolationDays
                    ? ` Isolating on day ${dayOfIsolation} of ${isolationDays}`
                    : 'N / A'}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Box mt={1}>
            <Button.Secondary
              color="secondary"
              variant="outlined"
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
          <Box m={4}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={4}
            >
              <Grid item xs={12}>
                <NativeSelect
                  options={[
                    {
                      value: 'Isolation not required',
                      label: 'Isolation not required',
                    },

                    {
                      value: 'Isolating',
                      label: 'Isolating',
                    },
                    {
                      value: 'Isolating Completed',
                      label: 'Isolating Completed',
                    },
                  ]}
                  label="Isolation Status"
                  name="isolationStatus"
                  control={control}
                  defaultValue={isolationStatus || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <NativeSelect
                  options={[
                    {
                      value: 'Symptoms (10 days)',
                      label: 'Symptoms (10 days)',
                    },

                    {
                      value: 'Tested Positive (10 days)',
                      label: 'Tested Positive (10 days)',
                    },
                    {
                      value: 'Contact with Symptoms or Positive Case (14 days)',
                      label: 'Contact with Symptoms or Positive Case (14 days)',
                    },
                    {
                      value: 'Following discharge (14 days)',
                      label: 'Following discharge (14 days)',
                    },
                  ]}
                  label="Isolation Reason"
                  name="isolationReason"
                  control={control}
                  defaultValue={isolationReason || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Isolation End Date"
                  name={'isolationDateEnd'}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={isolationEnd || ''}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
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
              <Button.Secondary variant="contained" onClick={handleClose}>
                Confirm
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
