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
import { Button, NativeSelect, Dialog, DialogTitle } from 'components';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function CovidStatus() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const { control } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
                id="read-only-input-covid"
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
                id="read-only-input-covid-date"
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
                  defaultValue=""
                />
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
