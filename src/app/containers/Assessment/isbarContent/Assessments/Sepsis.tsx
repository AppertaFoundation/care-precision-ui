/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Chip,
  Box,
  FormLabel,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useForm } from 'react-hook-form';
import { ErrorMsg } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { selectSepsis } from '../../selectors';
import { actions } from '../../slice';
import uniqid from 'uniqid';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
    maxWidth: '200px',
    margin: '0 auto',
  },
}));

const SUSPICION_CHIPS = [
  { value: 'Age over 75', code: 'at0002' },
  {
    value: 'Impaired immunity (e.g diabetes, steroids, chemotherapy)',
    code: 'at0003',
  },
  { value: ' Recent trauma / surgery / invasive procedure', code: 'at0004' },
  { value: 'Indwelling Lines', code: 'at0005' },
];

const SOURCE_CHIPS = [
  { value: 'Respiratory', code: 'at0002' },
  { value: 'Brain', code: 'at0003' },
  { value: 'Urine', code: 'at0004' },
  { value: 'Surgical', code: 'at0005' },
  { value: 'Skin/ Joint/ Wound', code: 'at0006' },
  { value: 'Indweling device', code: 'at0007' },
  { value: 'Breast abscess', code: 'at0008' },
  { value: 'Abdominal pain / distension', code: 'at0009' },
  { value: 'Infected caesarean / perineal wound', code: 'at0010' },
  { value: 'Chorioamnionitis / endometritis', code: 'at0011' },
];

const RED_FLAG_CHIPS = [
  {
    value:
      'Objective evidence of new or altered mental state e.g. New deterioration in GCS/AVPU',
    code: 'at0002',
  },
  {
    value: 'Systolic BP ≤ 90 mmHg (or drop of >40 from normal)',
    code: 'at0004',
  },
  { value: 'Heart rate ≥ 130 per minute', code: 'at0005' },
  { value: 'Respiratory rate ≥ 25 per minute', code: 'at0006' },
  { value: 'Needs O2 to keep SpO2 ≥ 92% (88% in COPD)', code: 'at0007' },
  { value: 'Non-blanching rash / mottled / ashen / cyanotic', code: 'at0008' },
  { value: 'Lactate ≥ 2 mmol/l', code: 'at0009' },
  { value: 'Recent chemotherapy', code: 'at0010' },
  {
    value: 'Not passed urine in 18 hours (<0.5ml/kg/hr if catheterised)',
    code: 'at0011',
  },
];

const RED_FLAG_CHIPS_NO_CLINICAL = [
  {
    value: 'Objective evidence of new or altered mental state',
    code: 'at0012',
  },
  {
    value: 'Unable to stand / collapsed',
    code: 'at0013',
  },
  { value: 'Unable to catch breath / barely able to speak', code: 'at0014' },
  { value: 'Very fast breathing', code: 'at0015' },
  { value: 'Skin that is very pale, mottled , ashen or blue', code: 'at0016' },
  { value: 'Rash that doesn’t fade when pressed firmly', code: 'at0017' },
  { value: 'Recent chemotherapy', code: 'at0018' },
  { value: 'Under 17 and immunity impaired', code: 'at0019' },
];

const AMBER_FLAG_CHIPS = [
  { value: 'Relatives concerned about mental status', code: 'at0002' },
  {
    value: 'Nurse, relative or carer worried about patient (Palliative)',
    code: 'at0003',
  },
  { value: 'Acute deterioration in functional ability', code: 'at0004' },
  { value: 'Immunosuppressed', code: 'at0005' },
  { value: 'Trauma / surgery / procedure in last 8 weeks', code: 'at0006' },
  { value: 'Respiratory rate 21-24', code: 'at0007' },
  { value: 'Systolic BP 91-100 mmHg', code: 'at0008' },
  { value: 'Heart rate 91-130 or new dysrhythmia', code: 'at0009' },
  { value: 'Temperature <36°C', code: 'at0010' },
  { value: 'Clinical signs of wound infection', code: 'at0011' },
  {
    value: 'Not passed urine in last 12-18 hours, (Dental only)',
    code: 'at0012',
  },
];

const AMBER_FLAG_CHIPS_NO_CLINICAL = [
  { value: 'Behavioural change / reduced activity', code: 'at0013' },
  { value: 'Immunosuppressed', code: 'at0014' },
  { value: 'Breathing harder work than normal', code: 'at0015' },
  { value: 'Reduced urine output', code: 'at0016' },
  { value: 'Temperature <36°C', code: 'at0017' },
  { value: 'Signs of wound infection', code: 'at0018' },
];

const FLAG999 = [
  { value: 'Slurred speech or confusion', code: 'at0002' },
  { value: 'Extreme shivering or muscle pain', code: 'at0003' },
  { value: 'Passing no urine (in a day)', code: 'at0004' },
  { value: 'Severe breathlessness', code: 'at0005' },
  { value: '‘I feel I might die’', code: 'at0006' },
  { value: 'Skin mottled, ashen, blue or very pale', code: 'at0007' },
];

export const Sepsis: React.FC<{
  disabled?: boolean;
  onOpenSummary: any;
  onValidate: any;
  openErrorDialog: any;
}> = ({ disabled, onOpenSummary, onValidate, openErrorDialog }) => {
  const classess = useStyles();
  const dispatch = useDispatch();
  const sepsisDefault = useSelector(selectSepsis);
  const { register, setValue, errors, handleSubmit } = useForm({
    defaultValues: sepsisDefault,
  });

  const [state, setState] = React.useState({
    riskFactorsForSepsis: sepsisDefault?.riskFactorsForSepsis || [],
    likelySourceOfInfection: sepsisDefault?.likelySourceOfInfection || [],
    redFlags: sepsisDefault?.redFlags || [],
    amberFlags: sepsisDefault?.amberFlags || [],
    flags999: sepsisDefault?.flags999 || [],
  });

  const [clinical, setClinical] = React.useState(false);
  const RED_FLAG = clinical ? RED_FLAG_CHIPS : RED_FLAG_CHIPS_NO_CLINICAL;
  const AMBER_FLAG: { value?: string; code: string }[] = clinical
    ? AMBER_FLAG_CHIPS
    : AMBER_FLAG_CHIPS_NO_CLINICAL;

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    register({ name: 'riskFactorsForSepsis' });
    register({ name: 'likelySourceOfInfection' });
    register({ name: 'redFlags' });
    register({ name: 'amberFlags' });
    register({ name: 'flags999' });
  });
  //This maybe i can optymalize also??
  const useEffectOnSaveSuspision = (effect: React.EffectCallback) => {
    useEffect(effect, [state.riskFactorsForSepsis]);
  };
  useEffectOnSaveSuspision(() => {
    setValue('riskFactorsForSepsis', state.riskFactorsForSepsis);
  });
  const useEffectOnSaveSource = (effect: React.EffectCallback) => {
    useEffect(effect, [state.likelySourceOfInfection]);
  };
  useEffectOnSaveSource(() => {
    setValue('likelySourceOfInfection', state.likelySourceOfInfection);
  });
  const useEffectOnSaveSRedFlag = (effect: React.EffectCallback) => {
    useEffect(effect, [state.redFlags]);
  };
  useEffectOnSaveSRedFlag(() => {
    setValue('redFlags', state.redFlags);
  });
  const useEffectOnSaveAmberFlag = (effect: React.EffectCallback) => {
    useEffect(effect, [state.amberFlags]);
  };
  useEffectOnSaveAmberFlag(() => {
    setValue('amberFlags', state.amberFlags);
  });
  useEffectOnSaveAmberFlag(() => {
    setValue('flags999', state.flags999);
  });
  const isSelected = (key, code) =>
    state[key].find(selected => selected.code === code);

  const addElement = (key, value, code) => {
    const newTable = [{ value: value, code: code }, ...state[key]];
    setState({ ...state, [key]: newTable });
    return newTable;
  };

  const removeElement = (key, code) => {
    const newTable = state[key].filter(o => o.code !== code);
    setState({ ...state, [key]: newTable });
    return newTable;
  };

  const handleChange = (e, code) => {
    const value = e.target.textContent;
    const key = e.currentTarget.id;
    isSelected(key, code)
      ? removeElement(key, code)
      : addElement(key, value, code);
    e.currentTarget.blur();
    e.target.blur();
  };

  const handleChangeClincal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClinical(event.target.checked);
  };

  const onSubmit = data => {
    dispatch(actions.saveSepsis({ sepsis: state, clinical }));
    if (onValidate()) {
      dispatch(
        actions.calculateResult({ obsType: 'sepsis', assessmentForm: data }),
      );
      onOpenSummary();
    } else {
      openErrorDialog();
    }
  };
  return (
    <form
      style={{ width: '100%' }}
      id={`isbar-2-sepsis`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mr={3}>
        <Paper elevation={0} square>
          <Box m={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={clinical}
                  onChange={handleChangeClincal}
                  name="clinical"
                  color="primary"
                />
              }
              label="Clinical"
            />
          </Box>
          {/* SUSPICION-> RISK_FACTORY_FFOR_SEPSIS */}
          <Box m={1}>
            <FormLabel component="legend">Suspicion </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {SUSPICION_CHIPS.map(({ value, code }, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('riskFactorsForSepsis', code)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={value}
                      onClick={e => handleChange(e, code)}
                      className={classess.root}
                      id="riskFactorsForSepsis"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && (
                <ErrorMsg name={'riskFactorsForSepsis'} errors={errors} />
              )}
            </Box>
          </Box>

          {/*SOURCE -> LIKELY SOURECE OF INFECTION*/}
          <Box m={1}>
            <FormLabel component="legend">Source</FormLabel>

            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {SOURCE_CHIPS.map(({ value, code }, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('likelySourceOfInfection', code)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={value}
                      onClick={e => handleChange(e, code)}
                      className={classess.root}
                      id={'likelySourceOfInfection'}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && (
                <ErrorMsg name={'likelySourceOfInfection'} errors={errors} />
              )}
            </Box>
          </Box>

          {/*SEVERITY RED FLAG -> RED FLAG ACUTE*/}
          <Box m={1}>
            <FormLabel component="legend">Severity (Red Flag)</FormLabel>

            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {RED_FLAG.map(({ value, code }, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('redFlags', code)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={value}
                      onClick={e => handleChange(e, code)}
                      className={classess.root}
                      id={'redFlags'}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
              {FLAG999.map(({ value, code }, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('flags999', code)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={value}
                      onClick={e => handleChange(e, code)}
                      className={classess.root}
                      id={'flags999'}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'redFlags'} errors={errors} />}
            </Box>
          </Box>

          {/*SEVERITY AMBER FLAG -> AMBER FLAG ACUTE*/}
          <Box m={1}>
            <FormLabel component="legend">Severity (Amber Flag))</FormLabel>

            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {AMBER_FLAG.map(({ value, code }, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('amberFlags', code)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={value}
                      onClick={e => handleChange(e, code)}
                      className={classess.root}
                      id={'amberFlags'}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'amberFlags'} errors={errors} />}
            </Box>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};
