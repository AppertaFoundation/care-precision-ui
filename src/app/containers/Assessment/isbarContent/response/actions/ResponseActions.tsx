import React from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import Intervention from './Intervention';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import FurtherAssessment from './FurtherAssessment';
import NoFurtherAction from './NoFurtherAction';
import Monitor from './Monitor';

const useStyles = makeStyles({
  body: { height: '118px', overflowX: 'hidden', overflowY: 'auto' },
});
export const ResponseActions = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Grid item xs={12}>
      <Box p={1}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          {...(xs ? {} : { style: { height: '138px' } })}
        >
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Intervention />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Monitor />
                </Grid>
                <Grid item xs={6} md={6}>
                  <FurtherAssessment />
                </Grid>

                <Grid item xs={6} md={6}>
                  <Box m={1}>
                    <NoFurtherAction />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box p={1}>
                <Box p={1} className={classes.body}>
                  <Typography align="left" variant="subtitle1">
                    <Box mr={1} fontWeight="fontWeightBold">
                      Actions Taken
                    </Box>
                  </Typography>

                  <List dense>
                    <ListItem>
                      <ListItemText primary="User ZYX - Requested Intervention at 14.22" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="User ZYX - Requested Monitoring at 14.00" />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
