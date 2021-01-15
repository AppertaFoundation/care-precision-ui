/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  DialogContent,
  MenuItem,
  Typography,
  ListItem,
  List,
  ListItemIcon,
  Divider,
  ListItemText,
  Paper,
  InputAdornment,
  Avatar,
  Grid,
  Box,
  TextField,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { selectBackground } from '../selectors';
import { actions } from '../slice';

import VeryFit from './assests/very-fit.jpeg';
import Well from './assests/well.jpeg';
import ManagingWell from './assests/managing-well.jpeg';
import Vulnerable from './assests/vulnerable.jpeg';
import MildlyFrail from './assests/mildly-frail.jpeg';
import ModeratelyFrail from './assests/moderately-frail.jpeg';
import SeverelyFrail from './assests/severely-frail.jpeg';
import VerySeverelyFrail from './assests/very-severely-frail.jpeg';
import TerminallyIll from './assests/terminally-ill.jpeg';

import { CareRecordInfo } from './careRecordInfo';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import uniqid from 'uniqid';
import {
  ErrorMsg,
  BottomBar,
  Button,
  Carousel,
  Dialog,
  DialogTitle,
} from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
      maxWidth: 300,
    },
    root: {
      width: '100%',
    },
    form: {
      borderBottomColor: '#DADADA',
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderRadius: '0px 0px 15px 15px',
      marginBottom: '50px',
    },
    shareRecords: {
      backgroundColor: '#DADADA',
      border: '2px solid #fff',
      borderRadius: '35px',
      padding: '15px',
    },
  }),
);

export const FRAILTY_OPTIONS = [
  {
    icon: VeryFit,
    label: '1. Very Fit',
    value: 'Very Fit',
    code: 'at0005',
    ordinal: 0,
  },
  { icon: Well, label: '2. Well', value: 'Well', code: 'at0006', ordinal: 1 },
  {
    icon: ManagingWell,
    label: '3. Managing Well',
    value: 'Managing Well',
    code: 'at0007',
    ordinal: 2,
  },
  {
    icon: Vulnerable,
    label: '4. Vurnerable',
    value: 'Vurnerable',
    code: 'at0008',
    ordinal: 3,
  },
  {
    icon: MildlyFrail,
    label: '5. Mildly Frail',
    value: 'Mildy Frail',
    code: 'at0009',
    ordinal: 4,
  },
  {
    icon: ModeratelyFrail,
    label: '6. Moderately Frail',
    value: 'Moderately Frail',
    code: 'at0010',
    ordinal: 5,
  },
  {
    icon: SeverelyFrail,
    label: '7. Severely Frail',
    value: 'Severely Frail',
    code: 'at0011',
    ordinal: 6,
  },
  {
    icon: VerySeverelyFrail,
    label: '8. Very SeverelyFrail',
    value: 'Very Severely Frail',
    code: 'at0012',
    ordinal: 7,
  },
  {
    icon: TerminallyIll,
    label: '9. Terminally Ill',
    value: 'Terminally Ill',
    code: 'at0013',
    ordinal: 8,
  },
];

export function Background() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const backgroundDefault = useSelector(selectBackground);

  const {
    handleSubmit,
    getValues,
    register,
    setValue,
    errors,
    trigger,
    formState,
  } = useForm({
    defaultValues: backgroundDefault,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [frailty, setFrailty] = React.useState<any>({});
  const [height, setHeight] = useState<any>('');
  const [weight, setWeight] = useState<any>('');

  const [selectedIndex, setSelectedIndex] = React.useState(
    FRAILTY_OPTIONS.indexOf(frailty),
  );

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  const validate = () => {
    const frailty = getValues('frailty');
    return (
      (frailty && Object.keys(frailty).length > 0) || 'This field is required'
    );
  };
  useEffectOnMount(() => {
    register({ name: 'frailty' }, { validate });
    setFrailty(backgroundDefault.frailty);
  });
  const onSubmit = data => {
    dispatch(actions.saveBackground(data));
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setFrailty(FRAILTY_OPTIONS[index]);
    handleClose();
  };

  const useEffectOnSaveFrality = (effect: React.EffectCallback) => {
    useEffect(effect, [frailty]);
  };

  useEffectOnSaveFrality(() => {
    const { isSubmitted } = formState;
    setValue('frailty', frailty);
    if (isSubmitted) {
      trigger('frailty');
    }
  });

  const handleClose = () => setOpen(false);

  const onChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'height') {
      setHeight(value);
    }
    if (name === 'weight') {
      setWeight(value);
    }
  };
  const careRecordInfo = CareRecordInfo({ register });
  const required = 'this field is required';

  return (
    <>
      <form id={`isbar-1`} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={0} square className={classes.form}>
          <Box m={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box mt={2}>
                  <TextField
                    value={height}
                    onChange={onChange}
                    label="Height"
                    name="height"
                    fullWidth
                    variant="outlined"
                    inputRef={register({ required })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                    }}
                  />
                  {errors && <ErrorMsg name={'height'} errors={errors} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box mt={2}>
                  <TextField
                    value={weight}
                    onChange={onChange}
                    inputRef={register({ required })}
                    fullWidth
                    label="Weight"
                    name="weight"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                  />
                  {errors && <ErrorMsg name={'weight'} errors={errors} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div onClick={e => setOpen(true)}>
                  <TextField
                    variant="outlined"
                    onClick={e => setOpen(true)}
                    label="Current Clinical Frailty"
                    fullWidth
                    name="frailty"
                    value={frailty?.label || ''}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <ArrowDropDownIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {FRAILTY_OPTIONS.map(({ label, icon }) => (
                      <MenuItem key={uniqid()} value={label}>
                        <Grid container direction="row">
                          <Grid item>
                            <Avatar src={icon}></Avatar>
                          </Grid>
                          <Grid item>
                            <ListItemText primary={label} />
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                {errors && <ErrorMsg name={'frailty'} errors={errors} />}
              </Grid>
              <Grid item xs={12}>
                <Box mt={1} mb={1} className={classes.shareRecords}>
                  <Typography align="center" variant="h6">
                    Share Care Record Information
                  </Typography>
                  {/* <CareRecordInfo register={register} /> */}
                  <Carousel>{careRecordInfo}</Carousel>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="title" onClose={handleClose}>
              <Grid
                container
                direction="column"
                justify="center"
                alignContent="center"
              >
                <Grid item>
                  <Typography align="center">
                    Current Clinical Frailty
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>

            <DialogContent>
              <div className={classes.root}>
                <List>
                  {FRAILTY_OPTIONS.map(({ label, icon }, index) => (
                    <ListItem
                      button
                      divider
                      selected={selectedIndex === index}
                      onClick={event => handleListItemClick(event, index)}
                      key={uniqid()}
                    >
                      <ListItemIcon>
                        <Avatar variant="square" src={icon} />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                      <Divider />
                    </ListItem>
                  ))}
                </List>
              </div>
            </DialogContent>
          </Dialog>
        </Paper>
      </form>

      <BottomBar>
        <Button.Secondary variant="contained" form={`isbar-1`} type="submit">
          SAVE BACKGROUND
        </Button.Secondary>
      </BottomBar>
    </>
  );
}
