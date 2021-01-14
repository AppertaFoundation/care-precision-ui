import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  Box,
  TextField,
  FormLabel,
  Chip,
  makeStyles,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogActions } from 'components';
import { actions } from '../../../slice';
import { selectResponse } from '../../../selectors';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: '280px',
    margin: '0 auto',
  },
  form: {
    borderBottomColor: '#DADADA',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderRadius: '0px 0px 15px 15px',
    marginBottom: '50px',
  },
}));
const NoFurtherAction = () => {
  const classess = useStyles();
  const response = useSelector(selectResponse);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const methods = useForm({});
  const { register, handleSubmit } = methods;
  React.useEffect(() => {
    setSelected(Boolean(response.keepComfortable));
  }, [response.keepComfortable]);

  const onSubmit = data => {
    if (selected || data.reason) {
      dispatch(actions.clearIntervention());
      dispatch(
        actions.addResponse({
          type: 'monitor',
          recommendation: null,
        }),
      );
    }
    if (selected) {
      dispatch(
        actions.addResponse({
          type: 'keepComfortable',
          recommendation: {
            recomendation: 'keep compoftable',
          },
        }),
      );
      dispatch(
        actions.addResponse({
          type: 'noAction',
          recommendation: null,
        }),
      );
    } else {
      dispatch(
        actions.addResponse({
          type: 'keepComfortable',
          recommendation: null,
        }),
      );
      dispatch(
        actions.addResponse({
          type: 'noAction',
          recommendation: data.reason
            ? {
                recomendation: 'no action require',
                reason: data.reason,
              }
            : null,
        }),
      );
    }

    handleClose();
  };
  const keepComfortable = () => setSelected(!selected);
  return (
    <Box m={1}>
      <Button.Primary
        onClick={handleOpen}
        variant={
          response.keepComfortable || response.noAction
            ? 'contained'
            : 'outlined'
        }
      >
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
                <Chip
                  clickable
                  {...(selected ? {} : { variant: 'outlined' })}
                  color="primary"
                  size="small"
                  label={'Keep Comfortable'}
                  onClick={keepComfortable}
                  className={classess.root}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">OR</FormLabel>
                <TextField
                  inputRef={register}
                  InputLabelProps={{ shrink: true }}
                  name="reason"
                  fullWidth
                  label="Reason why no further Actions"
                  multiline
                  rows="2"
                  disabled={selected}
                  defaultValue={response?.noAction?.recomendation?.reason || ''}
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
