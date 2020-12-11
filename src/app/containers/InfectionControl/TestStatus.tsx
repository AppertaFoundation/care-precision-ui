import React from 'react';
import { Box, TextField, Grid, Typography, FormLabel } from '@material-ui/core';
import { Button, Dialog, NativeSelect } from 'components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useForm } from 'react-hook-form';

export function TestStatus() {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints?.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [requestTest, setRequestTest] = React.useState(false);

  const closeRequest = () => setRequestTest(false);
  const openRequest = () => setRequestTest(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control } = useForm();
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
              spacing={2}
              //   spacing={4}
            >
              <Grid item>
                <Typography variant="h6">Test Status</Typography>
                <FormLabel component="legend">Testing</FormLabel>
              </Grid>
              {/* <Grid item>
                <FormLabel component="legend">Testing</FormLabel>
              </Grid> */}
              <Grid item>
                <TextField
                  size="small"
                  id="outlined-read-only-input"
                  label="Current Test Status"
                  defaultValue="No tests requested"
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
                  label="Test Reason"
                  defaultValue="N/A"
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
                  label="Date Last Updated"
                  type="date"
                  defaultValue="2020-08-22"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <Button.Primary
                  size="small"
                  variant="contained"
                  onClick={openRequest}
                >
                  Request Test
                </Button.Primary>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item>
                <Box mt={1}>
                  <FormLabel component="legend">Test Result</FormLabel>
                </Box>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  id="outlined-read-only-input"
                  label="Most Recent Result"
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
                  size="small"
                  id="outlined-read-only-input"
                  label="Date Last Result Received"
                  type="date"
                  defaultValue="2020-08-22"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button.Primary
                size="small"
                variant="contained"
                onClick={handleOpen}
              >
                Update test result
              </Button.Primary>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={requestTest}
        handleClose={closeRequest}
        title={'Request Test'}
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
              <Button.Secondary onClick={closeRequest}>Cancel</Button.Secondary>
            </Grid>
            <Grid item>
              <Button.Success variant="contained" onClick={closeRequest}>
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
            alignItems="center"
          >
            <NativeSelect
              options={[
                { value: 'Symptoms', label: 'Symptoms' },

                { value: 'Recovery Check', label: 'Recovery Check' },
                {
                  value: 'Contact with symptoms',
                  label: 'Contact with symptoms',
                },
                { value: 'Routine Test', label: 'Routine Test' },
              ]}
              label="Reason for test"
              name="reason"
              control={control}
            />
          </Grid>
        </Box>
      </Dialog>
      <Dialog
        open={open}
        handleClose={handleClose}
        title={'Update Test Result'}
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
            alignItems="center"
          >
            <NativeSelect
              options={[
                { value: 'Positive', label: 'Positive' },

                { value: 'Negative', label: 'Negative' },
              ]}
              label="Reason for test"
              name="reason"
              control={control}
            />
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
