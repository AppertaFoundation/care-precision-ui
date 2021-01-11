/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Chip, Box, FormLabel, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useForm } from 'react-hook-form';
import { ErrorMsg } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { selectSepsis } from '../../selectors';
import { actions } from '../../slice';
import uniqid from 'uniqid';

// import CombainedComponent from './CombainedComponent';
const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
    maxWidth: '200px',
    margin: '0 auto',
  },
}));

const SUSPICION_CHIPS = [
  'Age over 75',
  'Impaired immunity',
  'Recent Trauma',
  'Indwelling Lines',
];
const SOURCE_CHIPS = [
  'Respiratory',
  'Brain',
  'Urine',
  'Surgical',
  'Skin/ Joint/ Wound',
  'Indweling device',
];
const RED_FLAG_CHIPS = [
  'Objective evidence of new or altered mental state',
  'Systolic BP ≤ 90 mmHg (or drop of >40 from normal)',
  'Heart rate ≥ 130 per minute',
  'Respiratory rate ≥ 25 per minute',
  'Needs O2 to keep SpO2 ≥ 92% (88% in COPD)',
  'Non-blanching rash / mottled / ashen / cyanotic',
  'Lactate ≥ 2 mmol/l',
  'Recent chemotherapy',
  'Not passed urine in 18 hours (<0.5ml/kg/hr if catheterised)',
];
const AMBER_FLAG_CHIPS = [
  'Relatives concerned about mental status',
  'Acute deterioration in functional ability',
  // 'Immunosuppressed',
  'Trauma / surgery / procedure in last 8 weeks',
  'Respiratory rate 21-24',
  'Systolic BP 91-100 mmHg',
  'Heart rate 91-130 or new dysrhythmia',
  'Temperature <36°C',
  'Clinical signs of wound infection',
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
    redFlagAcute: sepsisDefault?.redFlagAcute || [],
    amberFlagAcute: sepsisDefault?.amberFlagAcute || [],
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    register({ name: 'riskFactorsForSepsis' });
    register({ name: 'likelySourceOfInfection' });
    register({ name: 'redFlagAcute' });
    register({ name: 'amberFlagAcute' });
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
    useEffect(effect, [state.redFlagAcute]);
  };
  useEffectOnSaveSRedFlag(() => {
    setValue('redFlagAcute', state.redFlagAcute);
  });
  const useEffectOnSaveAmberFlag = (effect: React.EffectCallback) => {
    useEffect(effect, [state.amberFlagAcute]);
  };
  useEffectOnSaveAmberFlag(() => {
    setValue('amberFlagAcute', state.amberFlagAcute);
  });

  const isSelected = (key, value) => state[key].includes(value);

  const addElement = (key, value) => {
    const newTable = [value, ...state[key]];
    setState({ ...state, [key]: newTable });
    return newTable;
  };

  const removeElement = (key, value) => {
    const newTable = state[key].filter(o => o !== value);
    setState({ ...state, [key]: newTable });
    return newTable;
  };

  const handleChange = e => {
    const value = e.target.textContent;
    const key = e.currentTarget.id;
    isSelected(key, value) ? removeElement(key, value) : addElement(key, value);
    e.currentTarget.blur();
    e.target.blur();
  };

  const onSubmit = data => {
    dispatch(actions.saveSepsis(data));
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
          {/* SUSPICION-> RISK_FACTORY_FFOR_SEPSIS */}
          <Box m={1}>
            <FormLabel component="legend">Suspicion </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {SUSPICION_CHIPS.map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('riskFactorsForSepsis', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={item}
                      onClick={handleChange}
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
              {SOURCE_CHIPS.map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('likelySourceOfInfection', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={item}
                      onClick={handleChange}
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
              {RED_FLAG_CHIPS.map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('redFlagAcute', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={item}
                      onClick={handleChange}
                      className={classess.root}
                      id={'redFlagAcute'}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'redFlagAcute'} errors={errors} />}
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
              {AMBER_FLAG_CHIPS.map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(isSelected('amberFlagAcute', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={item}
                      onClick={handleChange}
                      className={classess.root}
                      id={'amberFlagAcute'}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'amberFlagAcute'} errors={errors} />}
            </Box>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};
