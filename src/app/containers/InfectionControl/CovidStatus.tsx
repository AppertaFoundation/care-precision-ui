import React from 'react';
import { Box, TextField, Grid, Typography } from '@material-ui/core';
import { Button, Dialog, NativeSelect } from 'components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useForm } from 'react-hook-form';
export function CovidStatus() {
  const { control } = useForm();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints?.down('sm'));
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
                <Typography variant="h6">COVID</Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-read-only-input"
                  size="small"
                  label="Current Covid Status"
                  defaultValue="Positive"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-read-only-input"
                  label="Date Last Updated"
                  type="date"
                  defaultValue="2020-08-22"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button.Primary variant="contained" onClick={handleOpen}>
                Update COVID Status
              </Button.Primary>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={open}
        handleClose={handleClose}
        title={'Update COVID Status'}
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
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Box p={1}>
              <NativeSelect
                options={[
                  { value: 'Positive', label: 'Positive' },

                  { value: 'Negative', label: 'Negative' },
                  { value: 'Recovered', label: 'Recovered' },
                  { value: 'Contact', label: 'Contact' },
                  { value: 'Symptoms', label: 'Symptoms' },
                ]}
                label="Current COVID Status"
                name="covidStatus"
                control={control}
              />
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
