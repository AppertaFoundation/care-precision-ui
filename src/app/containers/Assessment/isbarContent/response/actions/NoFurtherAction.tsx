import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  Box,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogActions } from 'components';
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
      <Button.Primary onClick={handleOpen} variant="outlined">
        No further Action
      </Button.Primary>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Request no further Action{' '}
          </Typography>
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
                  fullWidth
                  label="Reason why no further Actions"
                  multiline
                  rows="2"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button.Primary onClick={handleClose} color="primary">
            Cancel
          </Button.Primary>
          <Button.Secondary
            variant="contained"
            form={`no-further-action`}
            type="submit"
          >
            Confirm
          </Button.Secondary>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NoFurtherAction;
