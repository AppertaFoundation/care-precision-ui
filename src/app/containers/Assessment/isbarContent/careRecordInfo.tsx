import React from 'react';
import {
  Paper,
  makeStyles,
  Box,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    height: 150,
    margin: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const CarouselCard = ({ children, label }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle2" align="center">
        {label}
      </Typography>
      <Paper variant="outlined" square>
        <div className={classes.demo}>{children}</div>
      </Paper>
    </>
  );
};

const CareRecordInfo = ({ register }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('sm'));
  return md
    ? [
        <Grid container direction="row" justify="center" alignItems="flex-end">
          <Grid item sm={3} xs={12}>
            <Box mr={1}>
              <CarouselCard label="Existing Conditions">
                <TextField
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
                  name="pastHistory"
                  multiline
                  rows="6"
                  inputRef={register}
                  fullWidth
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box mr={1}>
              <CarouselCard label="Allergies">
                <TextField
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
                  name="allergies"
                  multiline
                  rows="6"
                  inputRef={register}
                  fullWidth
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CarouselCard label="Medication">
              <TextField
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
                name="medication"
                multiline
                rows="6"
                inputRef={register}
                fullWidth
              />
            </CarouselCard>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CarouselCard label="RESPECT Status">
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                mollis, augue et mollis fermentum, lectus risus commodo lorem,
                id congue libero augue eget sapien. In semper sollicitudin
                semper.
              </Typography>
            </CarouselCard>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard label="Existing Conditions">
          <TextField
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
            name="pastHistory"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
          />
        </CarouselCard>,
        <CarouselCard label="Allergies">
          <TextField
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
            name="allergies"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
          />
        </CarouselCard>,
        <CarouselCard label="Medication">
          <TextField
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
            name="medication"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
          />
        </CarouselCard>,
        <CarouselCard label="RESPECT Status">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            mollis, augue et mollis fermentum, lectus risus commodo lorem, id
            congue libero augue eget sapien. In semper sollicitudin semper.{' '}
          </Typography>
        </CarouselCard>,
      ];
};

export { CareRecordInfo };
