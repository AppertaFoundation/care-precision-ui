/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Chip, Box, FormLabel, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import uniqid from 'uniqid';
import { ErrorMsg } from 'components';
import { useForm } from 'react-hook-form';
import { selectDenwis } from '../../selectors';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slice';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: '110px',
    margin: '0 auto',
  },
}));

export const Denwis = ({
  onOpenSummary,
  disabled,
  openErrorDialog,
  onValidate,
}) => {
  const classess = useStyles();
  const dispatch = useDispatch();
  const denwis = useSelector(selectDenwis);

  const { register, setValue, errors, getValues, handleSubmit } = useForm({
    defaultValues: denwis,
  });

  const [state, setState] = useState<{
    q1Breathing: { value: string; id: string };
    q2Circulation: { value: string; id: string };
    q3Temperature: { value: string; id: string };
    q4Mentation: { value: string; id: string };
    q5Agitation: { value: string; id: string };
    q6Pain: { value: string; id: string };
    q7Trajectory: { value: string; id: string };
    q8PatientSubjective: { value: string; id: string };
    q9NurseSubjective: { value: string; id: string };
    q10OtherComment: { value: string; id: string };
  }>({
    q1Breathing: denwis?.q1Breathing || { value: '', id: ' ' },
    q2Circulation: denwis?.q2Circulation || { value: '', id: ' ' },
    q3Temperature: denwis?.q3Temperature || { value: '', id: ' ' },
    q4Mentation: denwis?.q4Mentation || { value: '', id: ' ' },
    q5Agitation: denwis?.q5Agitation || { value: '', id: ' ' },
    q6Pain: denwis?.q6Pain || { value: '', id: ' ' },
    q7Trajectory: denwis?.q7Trajectory || { value: '', id: ' ' },
    q8PatientSubjective: denwis?.q8PatientSubjective || { value: '', id: ' ' },
    q9NurseSubjective: denwis?.q9NurseSubjective || { value: '', id: ' ' },
    q10OtherComment: denwis?.q10OtherComment || { value: '', id: ' ' },
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    Object.keys(state).map((item, index) =>
      register(
        { name: `${item}` },
        {
          validate: () => {
            const chip = getValues(item);
            return Boolean(chip) || 'Plese select any option';
          },
        },
      ),
    );
  });

  const useQ1Breathing = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q1Breathing]);
  useQ1Breathing(() => {
    setValue('q1Breathing', state.q1Breathing);
  });

  const useQ1Circulation = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q2Circulation]);
  useQ1Circulation(() => {
    setValue('q2Circulation', state.q2Circulation);
  });

  const useQ3Temperature = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q3Temperature]);
  useQ3Temperature(() => setValue('q3Temperature', state.q3Temperature));

  const useQ4Mentation = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q4Mentation]);
  useQ4Mentation(() => setValue('q4Mentation', state.q4Mentation));

  const useQ5Agitation = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q5Agitation]);
  useQ5Agitation(() => setValue('q5Agitation', state.q5Agitation));

  const useQ6Pain = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q6Pain]);
  useQ6Pain(() => setValue('q6Pain', state.q6Pain));

  const useQ8PatientSubjective = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q8PatientSubjective]);
  useQ8PatientSubjective(() =>
    setValue('q8PatientSubjective', state.q8PatientSubjective),
  );

  const useQ7Trajectory = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q7Trajectory]);
  useQ7Trajectory(() => setValue('q7Trajectory', state.q7Trajectory));

  const useQ9NurseSubjective = (effect: React.EffectCallback) =>
    useEffect(effect, [state.q9NurseSubjective]);
  useQ9NurseSubjective(() =>
    setValue('q9NurseSubjective', state.q9NurseSubjective),
  );

  const excludedIsSelected = (key, value) => state[key].id === value.id;

  const excludedHandleChange = e => {
    const { target, currentTarget } = e;
    const { textContent: value, id } = target;
    const { id: key } = currentTarget;
    setState({ ...state, [key]: { value, id } });
  };

  const onSubmit = data => {
    dispatch(actions.saveDenwis(data));
    if (onValidate()) {
      dispatch(
        actions.calculateResult({ obsType: 'denwis', assessmentForm: data }),
      );
      onOpenSummary();
    } else {
      openErrorDialog();
    }
  };
  return (
    <form
      style={{ width: '100%' }}
      id={`isbar-2-denwis`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box mr={3}>
        <Paper elevation={0} square>
          <Box m={1}>
            <FormLabel component="legend">Q1 Breathing </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No change in breathing', id: 'at0032' },
                { value: 'Change in breathing', id: 'at0031' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q1Breathing', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q1Breathing"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'q1Breathing'} errors={errors} />}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q2 Circulation </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No change in circulation', id: 'at0037' },
                { value: 'Change in circulation', id: 'at0036' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q2Circulation', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q2Circulation"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'q2Circulation'} errors={errors} />}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q3 Temperature</FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No change in temperature', id: 'at0042' },
                { value: 'Change in temperature', id: 'at0105' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q3Temperature', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q3Temperature"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'q3Temperature'} errors={errors} />}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q4 Mentation </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No change in mentation', id: 'at0046' },
                { value: 'Change in mentation', id: 'at0045' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q4Mentation', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q4Mentation"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'q4Mentation'} errors={errors} />}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q5 Agitation </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No agitation', id: 'at0048' },
                { value: 'Agitation', id: 'at0049' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q5Agitation', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q5Agitation"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'q5Agitation'} errors={errors} />}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q6 Pain </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No change in pain', id: 'at0051' },
                { value: 'Change in pain', id: 'at0052' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q6Pain', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q6Pain"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>{errors && <ErrorMsg name={'q6Pain'} errors={errors} />}</Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q7 Trajectory </FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No change in trajectory', id: 'at0054' },
                { value: 'Change in trajectory', id: 'at0055' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q7Trajectory', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q7Trajectory"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && <ErrorMsg name={'q7Trajectory'} errors={errors} />}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q8 Patient subjective</FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No subjective patient indicator', id: 'at0057' },
                { value: 'Subjective patient indicator', id: 'at0058' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q8PatientSubjective', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q8PatientSubjective"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && (
                <ErrorMsg name={'q8PatientSubjective'} errors={errors} />
              )}
            </Box>
          </Box>

          <Box m={1}>
            <FormLabel component="legend">Q9 Nurse subjective</FormLabel>
            <Box
              display="flex"
              justifyContent={'flex-start'}
              flexWrap="wrap"
              bgcolor="background.paper"
            >
              {[
                { value: 'No nurse subjective indicator', id: 'at0060' },
                { value: 'Nurse subjective indicator', id: 'at0061' },
              ].map((item, index) => {
                return (
                  <Box m={1} key={uniqid()}>
                    <Chip
                      clickable
                      {...(excludedIsSelected('q9NurseSubjective', item)
                        ? {}
                        : { variant: 'outlined' })}
                      color="primary"
                      size="small"
                      label={<span id={item.id}>{item.value}</span>}
                      onClick={excludedHandleChange}
                      className={classess.root}
                      id="q9NurseSubjective"
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {errors && (
                <ErrorMsg name={'q9NurseSubjective'} errors={errors} />
              )}
            </Box>
          </Box>
          <Box m={1}>
            <TextField
              disabled={disabled}
              name="q10OtherComment"
              variant="outlined"
              label="Additional Comments"
              fullWidth
              inputRef={register({
                required: 'This field is required',
              })}
            />
            {errors && <ErrorMsg name={'q10OtherComment'} errors={errors} />}
          </Box>
        </Paper>
      </Box>
    </form>
  );
};
