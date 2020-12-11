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
import { useDispatch } from 'react-redux';
import { setAssessmentType } from 'store/assessmentTypeReducer';
import { useNavigate, useParams } from 'react-router-dom';
const FurtherAssessment = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleRedirect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    const { value } = event.currentTarget as HTMLButtonElement;
    dispatch(setAssessmentType(value));
    navigate(`/assessment/${id}/${2}/${value}`);
  };
  return (
    <Box m={1}>
      <Button.Secondary onClick={handleOpen} variant="outlined">
        Further Assessment
      </Button.Secondary>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography align="center">Further Assessment</Typography>
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
                  // disabled
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
                  SEPSIS Screem (Pre-Admission){' '}
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
