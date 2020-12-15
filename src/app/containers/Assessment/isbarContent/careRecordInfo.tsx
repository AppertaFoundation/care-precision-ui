import React from 'react';
import { makeStyles, Box, Grid, TextField } from '@material-ui/core';
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

const CarouselCard = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      {/* <Typography variant="subtitle2" align="center">
        {label}
      </Typography> */}
      <div className={classes.demo}>{children}</div>
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
              <CarouselCard>
                <TextField
                  //       defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  // Vivamus mollis, augue et mollis fermentum, lectus risus
                  // commodo lorem, id congue libero augue eget sapien. In semper
                  // sollicitudin sempe"
                  name="pastHistory"
                  multiline
                  rows="6"
                  label="Existing Conditions"
                  inputRef={register}
                  fullWidth
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box mr={1}>
              <CarouselCard>
                <TextField
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
                  name="allergies"
                  label="Allergies"
                  multiline
                  rows="6"
                  inputRef={register}
                  fullWidth
                />
              </CarouselCard>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CarouselCard>
              <TextField
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
                name="medication"
                label="Medication"
                multiline
                rows="6"
                inputRef={register}
                fullWidth
              />
            </CarouselCard>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CarouselCard>
              <TextField
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
                name="medication"
                label="RESPECT Status"
                multiline
                inputRef={register}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
                rows="6"
              />
            </CarouselCard>
          </Grid>
        </Grid>,
      ]
    : [
        <CarouselCard>
          <TextField
            // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            // Vivamus mollis, augue et mollis fermentum, lectus risus
            // commodo lorem, id congue libero augue eget sapien. In semper
            // sollicitudin sempe"
            name="pastHistory"
            label="Existing Conditions"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
            size="small"
          />
        </CarouselCard>,
        <CarouselCard>
          <TextField
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
            name="allergies"
            label="Allergies"
            multiline
            inputRef={register}
            fullWidth
            rows="6"
            size="small"
          />
        </CarouselCard>,
        <CarouselCard>
          <TextField
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
            name="medication"
            label="Medication"
            multiline
            inputRef={register}
            fullWidth
            size="small"
            rows="6"
          />
        </CarouselCard>,
        <CarouselCard>
          <TextField
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus mollis, augue et mollis fermentum, lectus risus
            commodo lorem, id congue libero augue eget sapien. In semper
            sollicitudin sempe"
            name="medication"
            label="RESPECT Status"
            multiline
            inputRef={register}
            // InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            rows="6"
          />
        </CarouselCard>,
      ];
};

export { CareRecordInfo };
