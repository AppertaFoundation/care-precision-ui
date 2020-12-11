import React from 'react';
import {
  Grid,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  Box,
} from '@material-ui/core';
import { Button } from 'components';

const Intervention: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box m={1}>
      <Button.Secondary onClick={handleOpen} variant="outlined">
        Intervention
      </Button.Secondary>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography align="center">Intervantion</Typography>
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Button.Primary
                //   onClick={handleRedirect}
                variant="outlined"
                value="news2"
                fullWidth
              >
                Suspected COVID
              </Button.Primary>
            </Grid>
            <Grid item xs={12}>
              <Button.Primary
                //   onClick={handleRedirect}
                variant="outlined"
                value="denwis"
                fullWidth
              >
                Internal Escalation
              </Button.Primary>
            </Grid>
            <Grid item xs={12}>
              <Button.Primary
                //   onClick={handleRedirect}
                variant="outlined"
                value="sepsis"
                // disabled
                fullWidth
              >
                External Escalation
              </Button.Primary>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default Intervention;
