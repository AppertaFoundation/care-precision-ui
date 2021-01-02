import React from 'react';
import { Box, TextField, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Dialog, NativeSelect } from 'components';
import { useForm } from 'react-hook-form';
// import
export function IsolationStatus() {
  const theme = useTheme();
  const { control } = useForm();
  const downSm = useMediaQuery(theme.breakpoints?.down('sm'));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box m={1} p={1}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          style={{ height: `${downSm ? 'auto' : '450px'}` }}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={4}
            >
              <Grid item>
                <Typography variant="h6">Isolation Status</Typography>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  id="outlined-read-only-input"
                  label="Current Isolation Status"
                  defaultValue="Isolating- 10 Days"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item>
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
              <Grid item>
                <TextField
                  size="small"
                  id="outlined-read-only-input"
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
              <Grid item>
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
              <Grid item>
                <Typography variant="subtitle2">
                  Isolating on day 6 of 10
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button.Primary variant="contained" onClick={handleOpen}>
                Update Isolation Status
              </Button.Primary>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <Dialog
        open={open}
        handleClose={handleClose}
        title={'Update Isolation Status'}
        fullScreen={downSm}
        maxWidth="sm"
        fullWidth
        bottomActions={
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
              <Button.Success variant="contained" onClick={handleClose}>
                Confirm
              </Button.Success>
            </Grid>
          </Grid>
        }
      >
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                id="outlined-read-only-input"
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
      </Dialog>
    */}
    </>
  );
}
