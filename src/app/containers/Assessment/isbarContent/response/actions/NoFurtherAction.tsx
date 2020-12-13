import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  Box,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from 'components';
import { actions } from '../../../slice';

const NoFurtherAction = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const methods = useForm({});
  const { register, handleSubmit } = methods;

  const onSubmit = data => {
    dispatch(actions.actionNoAction(data));
    handleClose();
  };
  return (
    <Box m={1}>
      <Button.Secondary onClick={handleOpen} variant="outlined">
        No further Action
      </Button.Secondary>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography align="left">Request no further Action</Typography>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} id="no-further-action">
            <Grid
              container
              direction="column"
              justify="space-around"
              spacing={2}
            >
              <Grid item xs={12}>
                <TextField
                  inputRef={register}
                  InputLabelProps={{ shrink: true }}
                  name="recommendation"
                  label="Reason why no further Actions"
                  placeholder="Reason"
                  multiline
                  rows="2"
                />
              </Grid>
            </Grid>
          </form>
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
              <Button.Success
                variant="contained"
                form={`no-further-action`}
                type="submit"
              >
                Confirm
              </Button.Success>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NoFurtherAction;
