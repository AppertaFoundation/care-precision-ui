import React from 'react';
import { DialogContent, ListItem, List, ListItemText } from '@material-ui/core';
import { Button, Dialog, DialogTitle, DialogActions } from 'components';
import uniqid from 'uniqid';

const AssessmentError: React.FC<{
  open: boolean;
  handleClose: any;
  errors: string[];
}> = ({ open, handleClose, errors }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="scroll-dialog-title" onClose={handleClose}>
        Present errors
      </DialogTitle>
      <DialogContent dividers={true}>
        <List dense={true}>
          {errors.map(error => (
            <ListItem key={uniqid()}>
              <ListItemText
                primary={`• ${error}`}
                primaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button.Secondary onClick={handleClose} variant="contained">
          Confirm
        </Button.Secondary>
      </DialogActions>
    </Dialog>
  );
};
export default AssessmentError;
