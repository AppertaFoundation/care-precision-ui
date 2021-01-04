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
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Dialog, NativeSelect, DialogTitle } from 'components';
import { useForm } from 'react-hook-form';

export function IsolationStatus() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

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
                defaultValue="Isolating- 10 Days"
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
                defaultValue="Tested Positive"
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
                defaultValue="2020-08-18"
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
                defaultValue="2020-08-28"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                Isolating on day 6 of 10
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
                  name="reason"
                  control={control}
                  defaultValue=""
                />
              </Grid>

              <Grid item xs={12}>
                <NativeSelect
                  options={[
                    {
                      value: 'Symptoms (10 days duration)',
                      label: 'Symptoms (10 days duration)',
                    },

                    {
                      value: 'Tested Positive (10 days duration)',
                      label: 'Tested Positive (10 days duration)',
                    },
                    {
                      value: 'Contact with Symptoms or Positive Case (14 days)',
                      label: 'Contact with Symptoms or Positive Case (14 days)',
                    },
                    {
                      value: 'Following discharge (14 days duration)',
                      label: 'Following discharge (14 days duration)',
                    },
                  ]}
                  label="Isolation Reason"
                  name="reason"
                  control={control}
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  id="read-only-input-isolation-end"
                  label="Isolation End Date"
                  type="date"
                  defaultValue="2020-08-28"
                  InputProps={
                    {
                      //   readOnly: true,
                    }
                  }
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
      *
    </>
  );
}
