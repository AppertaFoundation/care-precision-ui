import React from 'react';

import {
  Grid,
  Typography,
  DialogContent,
  Box,
  FormControl,
  FormLabel,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  DialogTitle,
  Dialog,
  SelectItem,
  DialogActions,
  Button,
} from 'components';
import uniqid from 'uniqid';

const useStyles = makeStyles({
  content: { padding: 24 },
});
interface Props {
  open: boolean;
  handleClose: () => void;
  status: string;
}
const StatusDialog: React.FC<Props> = ({ open, handleClose, status }) => {
  const [state, setState] = React.useState('');
  const classes = useStyles();

  const handleChange = event => {
    setState(event.target.value);
  };

  const STATUS_MAP = {
    PENDING: ['ACCEPTED', 'AWAITNG OUTCOME', 'REJECTED', 'CANCELLED'],
    ACCEPTED: ['COMPLETED', 'AWAITNG OUTCOME', 'REJECTED', 'CANCELLED'],
    AWAITING: ['COMPLETED', 'REJECTED', 'CANCELLED'],
    CANCELLED: ['ACCEPTED', 'AWAITNG OUTCOME', 'REJECTED'],
    REJECTED: ['ACCEPTED', 'AWAITNG OUTCOME', 'CANCELLED'],
  };

  const updateStatus = () => {
    console.log('STATUS UPDATED');
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="title" onClose={handleClose}>
        <Typography component="div" noWrap variant="h5">
          Change task status
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Box p={1} flexShrink={1}>
            <FormControl>
              <FormLabel component="legend">Status:</FormLabel>
              <Select
                native
                value={state}
                onChange={handleChange}
                inputProps={{
                  name: 'taskStatus',
                }}
              >
                <SelectItem value="" aria-label="None" />
                {STATUS_MAP[status].map(value => (
                  <SelectItem key={uniqid()} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button.Primary onClick={handleClose} color="primary">
          Cancel
        </Button.Primary>
        <Button.Secondary
          color="primary"
          variant="contained"
          onClick={updateStatus}
        >
          Confirm
        </Button.Secondary>
      </DialogActions>
    </Dialog>
  );
};
export default StatusDialog;
