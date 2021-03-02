/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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
  fullWidth: { width: '100%' },
}));

const SYMPTOMS = [
  { value: 'Fever', code: '386661006', terminology: 'SNOMED-CT' },
  { value: 'Cough', code: '49727002', terminology: 'SNOMED-CT' },
  { value: 'Sore Throat', code: '162397003', terminology: 'SNOMED-CT' },
  { value: 'Ear pain', code: '16001004', terminology: 'SNOMED-CT' },
  { value: 'Runny Nose', code: '64531003', terminology: 'SNOMED-CT' },
  { value: 'Muscle aches', code: '68962001', terminology: 'SNOMED-CT' },
  { value: 'Joint pain', code: '57676002', terminology: 'SNOMED-CT' },
  { value: 'Fatigue/malaise', code: '84229001', terminology: 'SNOMED-CT' },
  {
    value: 'Anosmia (loss of taste/smell)',
    code: '272028008',
    terminology: 'SNOMED-CT',
  },
  { value: 'Diarrhea', code: '62315008', terminology: 'SNOMED-CT' },
  { value: 'Abdominal pain', code: '21522001', terminology: 'SNOMED-CT' },
  { value: 'Nausea and vomiting', code: '16932000', terminology: 'SNOMED-CT' },
  { value: 'Bleeding', code: '74474003', terminology: 'SNOMED-CT' },
  { value: 'Headache', code: '25064002', terminology: 'SNOMED-CT' },
  { value: 'Seizures', code: '91175000', terminology: 'SNOMED-CT' },
  { value: 'Altered consciousness', code: '3006004', terminology: 'SNOMED-CT' },
  { value: 'Chest pain', code: '29857009', terminology: 'SNOMED-CT' },
  { value: 'Shortness of breath', code: '267036007', terminology: 'SNOMED-CT' },
];

const CONTACT = [
  { value: 'Contact with suspected/ confirmed COVID', code: 'at0.9' },
  { value: 'Care settings has confirmed case', code: 'at0.14' },
];

export const Covid = ({
  onOpenSummary,
  disabled,
  onValidate,
  openErrorDialog,
}) => {
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
  const [state, setState] = React.useState({
    symptoms: covid?.symptoms || [],
    contact: covid?.contact || [],
  });

  const validateSymptomsContact = () => {
    const symptoms = getValues('symptoms');
    const contact = getValues('contact');

    return (
      symptoms.length > 0 ||
      contact.length > 0 ||
      'Please select any Symptoms or Contact case'
    );
  };

  const validateDate = () => {
    const symptoms = getValues('symptoms');
    const date = getValues('firstSympomsDate');
    return symptoms.length > 0 ? Boolean(date) || 'Please select date' : true;
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    register({ name: 'symptoms' }, { validate: validateSymptomsContact });
    register({ name: 'contact' }, { validate: validateSymptomsContact });
  });

  const useEffectOnSaveSymptomps = (effect: React.EffectCallback) => {
    useEffect(effect, [state.symptoms]);
  };
  useEffectOnSaveSymptomps(() => {
    const { isSubmitted } = formState;
    // setValue('symptoms', symptoms);
    setValue('symptoms', state.symptoms);
    if (isSubmitted) {
      trigger('symptoms');
      trigger('contact');
    }
  });
  const useEffectOnSaveContact = (effect: React.EffectCallback) => {
    useEffect(effect, [state.contact]);
  };
  useEffectOnSaveContact(() => {
    const { isSubmitted } = formState;
    setValue('contact', state.contact);
    if (isSubmitted) {
      trigger('contact');
      trigger('symptoms');
    }
  });

  const isSelected = (key, code) =>
    state[key].find(selected => selected.code === code);

  const addElement = (key, value, code) => {
    const newTable = [
      {
        value: value,
        code: code,
        terminology: key === 'contact' ? 'local' : 'SNOMED-CT',
      },
      ...state[key],
    ];
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
  const onSubmit = data => {
    dispatch(actions.saveCovid(data));
    if (onValidate()) {
      dispatch(
        actions.calculateResult({ obsType: 'covid', assessmentForm: data }),
      );
      onOpenSummary();
    } else {
      openErrorDialog();
    }
  };

  return (
    <form
      className={classess.fullWidth}
      id={`isbar-2-covid`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mr={3} ml={1}>
        <Paper elevation={0} square>
          <Box m={1}>
            <FormLabel component="legend">
              Date of onset or first symptoms
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
                inputRef={register({ validate: validateDate })}
                disabled={disabled}
                defaultValue={covid?.firstSympomsDate}
              />
              {errors && <ErrorMsg name={'firstSympomsDate'} errors={errors} />}
            </Grid>
          </Box>
          <Box m={1}>
            <FormLabel component="legend">
              Select all symptoms that apply
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
            {SYMPTOMS.map(({ value, code }) => {
              return (
                <Box m={1} key={uniqid()}>
                  <Chip
                    clickable
                    {...(isSelected('symptoms', code)
                      ? {}
                      : { variant: 'outlined' })}
                    color="primary"
                    size="small"
                    label={value}
                    onClick={e => handleChange(e, code)}
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
              Contact- Select all that apply
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
            {CONTACT.map(({ value, code }) => {
              return (
                <Box m={1} key={uniqid()}>
                  <Chip
                    clickable
                    {...(isSelected('contact', code)
                      ? {}
                      : { variant: 'outlined' })}
                    color="primary"
                    size="small"
                    label={value}
                    onClick={e => handleChange(e, code)}
                    className={classess.root}
                    id="contact"
                    disabled={disabled}
                  />
                </Box>
              );
            })}
            {errors && <ErrorMsg name={'symptoms'} errors={errors} />}
          </Box>

          <Box m={1}>
            <TextField
              name="covidNotes"
              variant="outlined"
              label="Additional Comments"
              fullWidth
              defaultValue={covid?.covidNotes}
              inputRef={register}
            />
          </Box>
        </Paper>
      </Box>
    </form>
  );
};
