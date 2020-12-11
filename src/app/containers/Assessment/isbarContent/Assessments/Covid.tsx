/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Chip,
  Box,
  Grid,
  FormLabel,
  Paper,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ErrorMsg } from 'components';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import { selectCovid } from '../../selectors';
import { actions } from '../../slice';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: '135px',
    margin: '0 auto',
    height: '100%',
  },
}));

const SYMPTOMS = [
  'Fever',
  'Presistent Cough',
  'Fatigue/ Malaise',
  'Sore Throat',
  'Joint Pain',
  'Chest Pain',
  'Breathlessnes',
  'Abdomial Pain',
  'Diarrhoea',
  'Ear Pain',
  'Runny Nose',
  'Seizures',
  'Headache',
  'Bleeding',
  'Vomiting/ Nausea',
  'Muscle Ache',
  'Anosmia (Loss of taste/ smell)',
  'Alterned Consiousness',
];

const CONTACT = [
  'Contact with suspected/ confirmed COVID',
  'Care settings has confirmed case',
];

export const Covid = ({ onOpenSummary, disabled }) => {
  const classess = useStyles();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints?.down('sm'));
  const covid = useSelector(selectCovid);
  const dispatch = useDispatch();
  const {
    getValues,
    register,
    setValue,
    errors,
    trigger,
    formState,
    handleSubmit,
  } = useForm({
    defaultValues: covid,
  });
  const [symptoms, setSymptoms] = useState<string[]>(covid?.symptoms || []);
  const [contact, setContact] = useState<string[]>(covid?.contact || []);

  const validateSymptoms = () => {
    const symptoms = getValues('symptoms');
    return symptoms.length > 0 || 'Please select any option';
  };
  const validateContact = () => {
    const symptoms = getValues('contact');
    return symptoms.length > 0 || 'Please select any option';
  };
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    register({ name: 'symptoms' }, { validate: validateSymptoms });
    register({ name: 'contact' }, { validate: validateContact });
  });

  const useEffectOnSaveSymptomps = (effect: React.EffectCallback) => {
    useEffect(effect, [symptoms]);
  };
  useEffectOnSaveSymptomps(() => {
    const { isSubmitted } = formState;
    setValue('symptoms', symptoms);
    if (isSubmitted) {
      trigger('symptoms');
    }
  });
  const useEffectOnSaveContact = (effect: React.EffectCallback) => {
    useEffect(effect, [contact]);
  };
  useEffectOnSaveContact(() => {
    const { isSubmitted } = formState;
    setValue('contact', contact);
    if (isSubmitted) {
      trigger('contact');
    }
  });

  const isSelected = (key, value) => {
    if (key === 'symptoms') {
      return symptoms.includes(value);
    } else if (key === 'contact') {
      return contact.includes(value);
    }
  };
  //TODO[15] I dont like how those methods looks,
  // to figure out something smatrter
  const addElement = (key, value) => {
    if (key === 'symptoms') {
      const newTable = [value, ...symptoms];
      setSymptoms(newTable);
      return newTable;
    } else if (key === 'contact') {
      const newTable = [value, ...contact];
      setContact(newTable);
      return newTable;
    }
  };
  const removeElement = (key, value) => {
    if (key === 'symptoms') {
      const newTable = symptoms.filter(o => o !== value);
      setSymptoms(newTable);
      return newTable;
    } else if (key === 'contact') {
      const newTable = contact.filter(o => o !== value);
      setContact(newTable);
      return newTable;
    }
  };

  const handleChange = e => {
    const value = e.target.textContent;
    const key = e.currentTarget.id;
    isSelected(key, value) ? removeElement(key, value) : addElement(key, value);
    e.currentTarget.blur();
    e.target.blur();
  };

  const onSubmit = data => {
    dispatch(actions.saveCovid(data));
    dispatch(
      actions.calculateResult({ obsType: 'covid', assessmentForm: data }),
    );
    onOpenSummary();
  };

  return (
    <form
      style={{ width: '100%' }}
      id={`isbar-2-covid`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mr={3} ml={1}>
        <Paper elevation={0} square>
          <Box m={1}>
            <FormLabel component="legend">
              Date of onset of first symptoms
            </FormLabel>
          </Box>
          <Box m={1} ml={1}>
            <Grid>
              <TextField
                id="date"
                name="firstSympomsDate"
                type="date"
                variant="outlined"
                size="small"
                inputRef={register({ required: 'This field is required' })}
                disabled={disabled}
              />
            </Grid>
          </Box>
          <Box m={1}>
            <FormLabel component="legend">
              Enter situation information (why are you concerned?)
            </FormLabel>
          </Box>
          <Box
            display="flex"
            justifyContent={'flex-start'}
            flexWrap="wrap"
            m={downSm ? 0 : 1}
            p={downSm ? 0 : 1}
            bgcolor="background.paper"
          >
            {SYMPTOMS.map((item, index) => {
              return (
                <Box m={1} key={uniqid()}>
                  <Chip
                    clickable
                    {...(isSelected('symptoms', item)
                      ? {}
                      : { variant: 'outlined' })}
                    color="primary"
                    size="small"
                    label={item}
                    onClick={handleChange}
                    className={classess.root}
                    id="symptoms"
                    disabled={disabled}
                  />
                </Box>
              );
            })}
            {errors && <ErrorMsg name={'symptoms'} errors={errors} />}
          </Box>
          <Box m={1}>
            <FormLabel component="legend">
              Enter situation information (why are you concerned?)
            </FormLabel>
          </Box>
          <Box
            display="flex"
            justifyContent={'flex-start'}
            flexWrap="wrap"
            m={downSm ? 0 : 1}
            p={downSm ? 0 : 1}
            bgcolor="background.paper"
          >
            {CONTACT.map((item, index) => {
              return (
                <Box m={1} key={uniqid()}>
                  <Chip
                    clickable
                    {...(isSelected('contact', item)
                      ? {}
                      : { variant: 'outlined' })}
                    color="primary"
                    size="small"
                    label={item}
                    onClick={handleChange}
                    className={classess.root}
                    id="contact"
                    disabled={disabled}
                  />
                </Box>
              );
            })}
            {errors && <ErrorMsg name={'symptoms'} errors={errors} />}
          </Box>
        </Paper>
      </Box>
    </form>
  );
};
