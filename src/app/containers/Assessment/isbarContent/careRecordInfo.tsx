import React from 'react';
import { makeStyles, Box, Grid, TextField } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import uniqid from 'uniqid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: 'transparent',
    height: 150,
    margin: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const CarouselCard = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.demo}>{children}</div>
    </>
  );
};

const CareRecordInfo = ({ register }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('md'));
  return md
    ? [
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
          key={uniqid()}
        >
          <Grid item sm={3} xs={12}>
            <Box mr={1}>
              <CarouselCard>
                <TextField
                  name="pastHistory"
                  multiline
                  rows="6"
                  label="Existing Conditions"
                  inputRef={register}
                  fullWidth
                  variant="outlined"
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box mr={1}>
              <CarouselCard>
                <TextField
                  // defaultValue=""
                  name="allergies"
                  label="Allergies"
                  multiline
                  rows="6"
                  inputRef={register}
                  variant="outlined"
                  fullWidth
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CarouselCard>
              <TextField
                name="medication"
                label="Medication"
                multiline
                rows="6"
                inputRef={register}
                fullWidth
                variant="outlined"
              />
            </CarouselCard>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CarouselCard>
              <TextField
                name="medication"
                label="RESPECT Status"
                multiline
                inputRef={register}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
                rows="6"
                variant="outlined"
              />
            </CarouselCard>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard key={uniqid()}>
          <TextField
            name="pastHistory"
            label="Existing Conditions"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
            size="small"
            variant="outlined"
          />
        </CarouselCard>,
        <CarouselCard key={uniqid()}>
          <TextField
            name="allergies"
            label="Allergies"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
            size="small"
            variant="outlined"
          />
        </CarouselCard>,
        <CarouselCard key={uniqid()}>
          <TextField
            name="medication"
            label="Medication"
            multiline
            inputRef={register}
            fullWidth
            size="small"
            rows="6"
            variant="outlined"
          />
        </CarouselCard>,
        <CarouselCard key={uniqid()}>
          <TextField
          
            name="medication"
            label="RESPECT Status"
            multiline
            inputRef={register}
            // InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            rows="6"
            variant="outlined"
          />
        </CarouselCard>,
      ];
};

export { CareRecordInfo };
