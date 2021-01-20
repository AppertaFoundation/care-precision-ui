import React from 'react';
import { Grid, DialogContent, Box, Typography } from '@material-ui/core';
import { Button, Dialog, DialogTitle } from 'components';
import { useDispatch } from 'react-redux';
import { setAssessmentType } from 'store/assessmentTypeReducer';
import { useHistory, useParams } from 'react-router-dom';

const FurtherAssessment = () => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const params = useParams();
  const id = (params as any)?.id;
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleRedirect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    const { value } = event.currentTarget as HTMLButtonElement;
    dispatch(setAssessmentType(value));
    history.push(`/assessment/${id}/${2}/${value}`);
  };
  return (
    <Box m={1}>
      <Button.Primary onClick={handleOpen} variant="outlined">
        Further Assessment
      </Button.Primary>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Further Assessment
          </Typography>
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
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="news2"
                  fullWidth
                >
                  NEWS2 Observation
                </Button.Primary>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="denwis"
                  fullWidth
                >
                  DENWIS{' '}
                </Button.Primary>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="sepsis"
                  fullWidth
                >
                  SEPSIS Screen{' '}
                </Button.Primary>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="covid"
                  fullWidth
                >
                  COVID Assessment{' '}
                </Button.Primary>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default FurtherAssessment;
