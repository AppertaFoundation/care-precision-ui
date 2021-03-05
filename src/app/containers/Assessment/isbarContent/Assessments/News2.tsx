/* eslint-disable react-hooks/exhaustive-deps */
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

const CONSCIOUSNESS = [
  {
    id: 'at0005',
    value: 'Alert',
  },
  {
    id: 'at0006',
    value: 'Voice',
  },
  {
    id: 'at0015',
    value: 'Confusion',
  },
  {
    id: 'at0007',
    value: 'Pain',
  },
  {
    id: 'at0008',
    value: 'Unresponsive',
  },
];
const News2 = ({ disabled, onOpenSummary, onValidate, openErrorDialog }) => {
  const news2Default = useSelector(selectNews2);
  const dispatch = useDispatch();
  const methodOfOxygenDeliveryName = 'inspiredOxygen.methodOfOxygenDelivery';

  const { handleSubmit, getValues, watch, register, errors, control } = useForm(
    {
      defaultValues: news2Default,
    },
  );
  const [airOrOxygen, setAirOrOxygen] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState({
    ab: 'ab',
    c: 'c',
    de: 'de',
  });
  const handleChange = panel => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded ? panel : false });
  };

  const intoACVPU = value => ({
    acvpu: {
      code: value,
      value: CONSCIOUSNESS.find(consciousness => consciousness.id === value)
        ?.value,
    },
  });
  const onSubmit = data => {
    const acvpu = intoACVPU(data.acvpu.code);
    dispatch(actions.saveNews2({ ...data, ...acvpu }));
    if (onValidate()) {
      dispatch(
        actions.calculateResult({ obsType: 'news2', assessmentForm: data }),
      );
      onOpenSummary();
    } else {
      openErrorDialog();
    }
  };

  const useEffectOnAirOrOxygenChange = (effect: React.EffectCallback) => {
    React.useEffect(effect, [watch(methodOfOxygenDeliveryName)]);
  };
  useEffectOnAirOrOxygenChange(() => {
    const value = watch(methodOfOxygenDeliveryName);
    if (value) {
      setAirOrOxygen(value !== 'Room Air');
    } else {
      setAirOrOxygen(false);
    }
  });

  const tempatureUnit = '\u2103';

  const bloodPreasureValidate = type => {
    const systolic = getValues('systolic.magnitude');
    const diastolic = getValues('diastolic.magnitude');
    if (systolic && diastolic) {
      if (parseInt(systolic) > parseInt(diastolic)) {
        return true;
      } else {
        return 'Systolic pressure must be higher than diastolic pressure';
      }
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
                <Box mb={3} />

                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label="Respiration Rate"
                    name="respiration_rate.magnitude"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Bpm</InputAdornment>
                      ),
                    }}
                    inputRef={register({
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
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
                  <input
                    type="hidden"
                    ref={register}
                    name="respiration_rate.units"
                    value="/min"
                  />

                  {errors && (
                    <ErrorMsg name={'respiration_rate.magnitude'} errors={errors} />
                  )}
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
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
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
                    id="o2-delivery-select"
                    disabled={disabled}
                    options={[
                      { value: 'Room Air', label: 'Room Air' },

                      { value: 'Mask', label: 'Mask' },
                      { value: 'Nasal Prong', label: 'Nasal Prong' },
                      { value: 'NIV', label: 'NIV' },
                    ]}
                    label="o2 Delivery"
                    name={methodOfOxygenDeliveryName}
                    control={control}
                    defaultValue={
                      news2Default?.inspiredOxygen?.methodOfOxygenDelivery
                    }
                    rules={{
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                    }}
                  />
                  {errors && (
                    <ErrorMsg
                      name={methodOfOxygenDeliveryName}
                      errors={errors}
                    />
                  )}
                </Grid>
                {airOrOxygen && (
                  <Grid item md={12}>
                    <TextField
                      disabled={disabled}
                      variant="outlined"
                      label="Flow Rate"
                      name="inspiredOxygen.flowRate.magnitude"
                      fullWidth
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      inputRef={register({
                        required: {
                          value: true,
                          message: 'This field is required',
                        },
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
                    <input
                      type="hidden"
                      ref={register}
                      name="inspiredOxygen.flowRate.units"
                      value="l/min"
                    />
                    {errors && (
                      <ErrorMsg
                        name={'inspiredOxygen.flowRate.magnitude'}
                        errors={errors}
                      />
                    )}
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
                        name="systolic.magnitude"
                        fullWidth
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mmHg</InputAdornment>
                          ),
                        }}
                        inputRef={register({
                          required: {
                            value: true,
                            message: 'This field is required',
                          },
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
                      <input
                        type="hidden"
                        ref={register}
                        name="systolic.units"
                        value="/mmHg"
                      />
                      {errors && (
                        <ErrorMsg name={'systolic.magnitude'} errors={errors} />
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        disabled={disabled}
                        variant="outlined"
                        label="Diastolic"
                        name="diastolic.magnitude"
                        fullWidth
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">mmHg</InputAdornment>
                          ),
                        }}
                        inputRef={register({
                          required: {
                            value: true,
                            message: 'This field is required',
                          },
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
                      <input
                        type="hidden"
                        ref={register}
                        name="diastolic.units"
                        value="/mmHg"
                      />
                      {errors && (
                        <ErrorMsg
                          name={'diastolic.magnitude'}
                          errors={errors}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label="Pulse Rate"
                    name="pulse.magnitude"
                    type="number"
                    fullWidth
                    inputRef={register({
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
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
                        <InputAdornment position="end">/min</InputAdornment>
                      ),
                    }}
                  />
                  <input
                    type="hidden"
                    ref={register}
                    name="pulse.units"
                    value="/min"
                  />
                  {errors && (
                    <ErrorMsg name={'pulse.magnitude'} errors={errors} />
                  )}
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
                    name="acvpu.code"
                    label="Consciousness"
                    errors={errors}
                    defaultValue={news2Default?.acvpu?.code}
                    register={register({
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                    })}
                    values={CONSCIOUSNESS}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    disabled={disabled}
                    variant="outlined"
                    label="Tempature"
                    name="temperature.magnitude"
                    type="number"
                    fullWidth
                    inputRef={register({
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
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
                  <input
                    type="hidden"
                    ref={register}
                    name="temperature.units"
                    value={tempatureUnit}
                  />
                  {errors && (
                    <ErrorMsg name={'tempature.magnitude'} errors={errors} />
                  )}
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
