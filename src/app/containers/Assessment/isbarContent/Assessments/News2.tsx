import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormLabel,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  ErrorMsg,
  NativeSelect,
  RadioGroup,
} from 'components';
import { selectNews2 } from '../../selectors';
import { actions } from '../../slice';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

const News2 = ({ disabled, onOpenSummary }) => {
  const news2Default = useSelector(selectNews2);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    getValues,
    watch,
    trigger,
    register,
    errors,
    control,
  } = useForm({
    defaultValues: news2Default,
  });
  const [airOrOxygen, setAirOrOxygen] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState({
    ab: 'ab',
    c: 'c',
    de: 'de',
  });

  const handleChange = panel => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded ? panel : false });
  };

  const onSubmit = data => {
    dispatch(actions.saveNews2(data));
    dispatch(
      actions.calculateResult({ obsType: 'news2', assessmentForm: data }),
    );
    onOpenSummary();
  };

  const useEffectOnAirOrOxygenChange = (effect: React.EffectCallback) => {
    React.useEffect(effect, [watch('o2Delivery')]);
  };
  useEffectOnAirOrOxygenChange(() => {
    const value = watch('o2Delivery');
    if (value) {
      setAirOrOxygen(value !== 'Room Air');
    } else {
      setAirOrOxygen(false);
    }
  });

  // const handleCloseSummary = () => setOpenSummary(false);
  const tempatureUnit = '\u2103';

  const bloodPreasureValidate = type => {
    const systolic = getValues('systolic');
    const diastolic = getValues('diastolic');
    if (systolic && diastolic) {
      trigger(type);
      return (
        systolic > diastolic ||
        'Systolic pressure must be higher than diastolic pressure'
      );
    } else return true;
  };
  return (
    <form
      style={{ width: '100%' }}
      id={`isbar-2-news2`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container justify="center">
        <Grid item xs={12} md={4}>
          <Accordion
            expanded={expanded.ab === 'ab'}
            onChange={handleChange('ab')}
          >
            <AccordionSummary
              IconButtonProps={{ color: 'inherit' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="subtitle2" component="h6">
                <Box fontWeight={900}>A + B</Box>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container wrap="nowrap" direction="column" spacing={2}>
                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label="Respiration Rate"
                    name="respirations"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Bpm</InputAdornment>
                      ),
                    }}
                    inputRef={register({
                      min: {
                        value: 1,
                        message: 'Respiration Rate should be between 1- 59',
                      },
                      max: {
                        value: 59,
                        message: 'Respiration Rate should be between 1- 59',
                      },
                    })}
                  />
                  {errors && <ErrorMsg name={'respirations'} errors={errors} />}
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label={'Oxygen Saturation- Scale 1'}
                    name="spo2"
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    inputRef={register({
                      min: {
                        value: 51,
                        message: 'Oxygen Saturation should be between 51- 100',
                      },
                      max: {
                        value: 100,
                        message: 'Oxygen Saturation should be between 51- 100',
                      },
                    })}
                  />
                  {errors && <ErrorMsg name={'spo2'} errors={errors} />}
                </Grid>

                <Grid item md={12}>
                  <NativeSelect
                    disabled={disabled}
                    options={[
                      { value: 'Room Air', label: 'Room Air' },

                      { value: 'Mask', label: 'Mask' },
                      { value: 'Nasal Prong', label: 'Nasal Prong' },
                      { value: 'NIV', label: 'NIV' },
                    ]}
                    label="o2 Delivery"
                    name="o2Delivery"
                    control={control}
                    defaultValue={news2Default?.o2Delivery}
                  />
                </Grid>
                {airOrOxygen && (
                  <Grid item md={12}>
                    <TextField
                      disabled={disabled}
                      variant="outlined"
                      label="Flow Rate"
                      name="flowRate"
                      fullWidth
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      inputRef={register({
                        min: {
                          value: 1,
                          message: 'Flow Rate should be between 1- 12',
                        },
                        max: {
                          value: 12,
                          message: 'Flow Rate should be between 1- 12',
                        },
                      })}
                    />
                    {errors && <ErrorMsg name={'flowRate'} errors={errors} />}
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} md={4}>
          <Accordion expanded={expanded.c === 'c'} onChange={handleChange('c')}>
            <AccordionSummary
              IconButtonProps={{ color: 'inherit' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="subtitle2" component="h6">
                <Box fontWeight={900}>C</Box>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container wrap="nowrap" direction="column" spacing={2}>
                <Grid item md={12}>
                  <Box mb={1}>
                    <FormLabel component="legend">Blood Pressure</FormLabel>
                  </Box>
                  <Grid container wrap="nowrap" direction="row" spacing={2}>
                    <Grid item>
                      <TextField
                        disabled={disabled}
                        variant="outlined"
                        label="Systolic"
                        name="systolic"
                        fullWidth
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mmHg</InputAdornment>
                          ),
                        }}
                        inputRef={register({
                          min: {
                            value: 1,
                            message:
                              'Systolic pressure should be between 1- 300',
                          },
                          max: {
                            value: 300,
                            message:
                              'Systolic pressure should be between 1- 300',
                          },
                          validate: bloodPreasureValidate,
                        })}
                      />
                      {errors && <ErrorMsg name={'systolic'} errors={errors} />}
                    </Grid>
                    <Grid item>
                      <TextField
                        disabled={disabled}
                        variant="outlined"
                        label="Diastolic"
                        name="diastolic"
                        fullWidth
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mmHg</InputAdornment>
                          ),
                        }}
                        inputRef={register({
                          min: {
                            value: 1,
                            message:
                              'Diastolic pressure should be between 1- 300',
                          },
                          max: {
                            value: 280,
                            message:
                              'Diastolic pressure should be between 1- 300',
                          },
                          validate: bloodPreasureValidate,
                        })}
                      />
                      {errors && (
                        <ErrorMsg name={'diastolic'} errors={errors} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label="Pulse Rate"
                    name="pulse"
                    type="number"
                    fullWidth
                    inputRef={register({
                      min: {
                        value: 1,
                        message: 'Pulse Rate should be between 1- 250',
                      },
                      max: {
                        value: 250,
                        message: 'Pulse Rate should be between 1- 250',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Bpm</InputAdornment>
                      ),
                    }}
                  />
                  {errors && <ErrorMsg name={'pulse'} errors={errors} />}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} md={4}>
          <Accordion
            expanded={expanded.de === 'de'}
            onChange={handleChange('de')}
          >
            <AccordionSummary
              IconButtonProps={{ color: 'inherit' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="subtitle2" component="h6">
                <Box fontWeight={900}>D + E</Box>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container wrap="nowrap" direction="column" spacing={2}>
                <Grid item md={12}>
                  <RadioGroup
                    disabled={disabled}
                    name="consciousness"
                    label="Consciousness"
                    defaultValue={news2Default?.consciousness}
                    register={register}
                    values={[
                      {
                        id: 'Alert',
                        value: 'Alert',
                      },
                      {
                        id: 'Voice',
                        value: 'Voice',
                      },
                      {
                        id: 'Confusion',
                        value: 'Confusion',
                      },
                      {
                        id: 'pain',
                        value: 'Pain',
                      },
                      {
                        id: 'Unresponsive',
                        value: 'Unresponsive',
                      },
                    ]}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label="Tempature"
                    name="tempature"
                    type="number"
                    fullWidth
                    inputRef={register({
                      min: {
                        value: 27.1,
                        message: 'Tempature should be between 27.1- 44.9',
                      },
                      max: {
                        value: 44.9,
                        message: 'Tempature should be between 27.1- 44.9',
                      },
                    })}
                    inputProps={{ step: '.01' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {tempatureUnit}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors && <ErrorMsg name={'temperature'} errors={errors} />}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </form>
  );
};

export { News2 };
