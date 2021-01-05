import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormLabel,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Button, Dialog, NativeSelect, DialogTitle } from 'components';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  selectTestRequestReason,
  selectTestRequestStatusUpdate,
  selectCurrentTestRequest,
} from './selectors';
export function TestStatus() {
  const [open, setOpen] = React.useState(false);
  const [requestTest, setRequestTest] = React.useState(false);

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const upLG = useMediaQuery(theme.breakpoints?.up(1280));

  const testRequestReason = useSelector(selectTestRequestReason);
  const testRequestStatus = useSelector(selectCurrentTestRequest);
  const testRequestTime = useSelector(selectTestRequestStatusUpdate);

  const closeRequest = () => setRequestTest(false);
  const openRequest = () => setRequestTest(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control } = useForm();
  return (
    <>
      <Grid
        container
        justify="space-between"
        spacing={2}
        style={{ height: `${small ? 'auto' : upLG ? '245px' : '450px'}` }}
      >
        <Grid item lg={6} xs={12}>
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: `${small ? 'auto' : upLG ? '249px' : '225px'}` }}
            spacing={1}
          >
            <Grid item>
              <FormLabel component="legend">Testing</FormLabel>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input-test"
                label="Current Test Status"
                defaultValue={testRequestStatus || 'No tests requested'}
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
                id="read-only-input-reason"
                label="Test Reason"
                defaultValue={testRequestReason || 'N/A'}
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
                id="read-only-input-test-date"
                label="Date Last Updated"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={testRequestTime || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid>
              <Box mt={1}>
                <Button.Secondary
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={openRequest}
                >
                  Request Test
                </Button.Secondary>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: `${small ? 'auto' : upLG ? '253px' : '225px'}` }}
            spacing={1}
          >
            <Grid item>
              <FormLabel component="legend">Test Result</FormLabel>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input-test-recent"
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
                id="read-only-input"
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

            <Grid item>
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
        </Grid>
      </Grid>

      <Dialog open={requestTest} onClose={closeRequest}>
        <DialogTitle id="title" onClose={closeRequest}>
          <Typography component="div" noWrap variant="h6">
            Request Test
          </Typography>
        </DialogTitle>

        <DialogContent>
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
                defaultValue=""
              />
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
              <Button.Primary onClick={closeRequest}>Cancel</Button.Primary>
            </Grid>
            <Grid item>
              <Button.Secondary variant="contained" onClick={closeRequest}>
                Confirm
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography variant="h6">Update Test Result</Typography>
        </DialogTitle>

        <DialogContent>
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
                label="Test Result"
                name="reason"
                control={control}
                defaultValue=""
              />
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
