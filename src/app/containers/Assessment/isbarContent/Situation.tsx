/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Chip,
  Box,
  Grid,
  FormLabel,
  Paper,
  Typography,
  TextField,
  InputLabel,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slice';
import { selectSituation } from '../selectors';
import { ErrorMsg, BoxWrapper } from 'components';
import uniqid from 'uniqid';
import { BottomBar, Button } from 'components';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minWidth: '280px',
    margin: '0 auto',
  },
  form: {
    borderBottomColor: '#DADADA',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderRadius: '0px 0px 15px 15px',
    marginBottom: '50px',
  },
}));

const Chips = [
  'Just not themselves',
  'Dizzness',
  'Increased anxiety/agitation',
  'Reduced mobility/coordination',
  'Withdrawn',
  'Dehydration',
  'Had a fall',
  'Loss of appetite',
  'Skin changges (colour/puffiness)',
  'Recently lost consciousness',
];
const MAX_CHARS_ISB_TABS = 255;

const Situation = () => {
  const classess = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const situationDefault = useSelector(selectSituation);
  const { id, obsType } = useParams();

  const {
    handleSubmit,
    getValues,
    register,
    setValue,
    errors,
    trigger,
  } = useForm({
    defaultValues: situationDefault,
  });
  const onSubmit = data => {
    dispatch(actions.saveSituation(data));
    navigate(`/assessment/${id}/${1}/${obsType}`, { replace: true });
  };

  const [selected, setSelected] = useState<string[]>([]);
  const [avaibleChars, setAvaibleChars] = useState(0);
  const [other, setOther] = useState<boolean>(false);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  const validate = () => {
    const softSigns = getValues('softSigns');
    return softSigns.length > 0 || 'Please select any option';
  };

  useEffectOnMount(() => {
    register({ name: 'softSigns' }, { validate });
    setSelected(situationDefault?.softSigns || []);
    const defaultNotes = situationDefault?.notes;
    if (defaultNotes) {
      setAvaibleChars(defaultNotes.length);
    }
    if (situationDefault?.other) {
      setOther(true);
    }
  });

  const useEffectOnSaveChips = (effect: React.EffectCallback) => {
    useEffect(effect, [selected]);
  };

  useEffectOnSaveChips(() => {
    setValue('softSigns', selected);
    if (errors.softSigns) {
      trigger('softSigns');
    }
  });
  const isSelected = value => {
    return selected.includes(value);
  };
  const addElement = value => {
    const newTable = [value, ...selected];
    setSelected(newTable);
    return newTable;
  };
  const removeElement = value => {
    const newTable = selected.filter(o => o !== value);
    setSelected(newTable);
    return newTable;
  };

  const handleChange = e => {
    const value = e.target.textContent;
    isSelected(value) ? removeElement(value) : addElement(value);
    e.currentTarget.blur();
    e.target.blur();
  };

  const hanldeChangeOther = e => {
    setOther(!other);
    handleChange(e);
  };

  const handleChangeAvaibleCharts = e => {
    e.preventDefault();
    const value = e.target.value;
    setAvaibleChars(value.length);
  };

  return (
    <>
      <form id={`isbar-0`} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={0} square className={classess.form}>
          <Box m={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box mt={2}>
                  <FormLabel component="legend">
                    Enter situation information (why are you concerned?)
                  </FormLabel>
                </Box>
              </Grid>
              <Grid item>
                <Box pl={2} pb={2}>
                  <Grid container alignItems="flex-start">
                    {Chips.map((item, index) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} key={uniqid()}>
                          <Box ml={2} mb={1}>
                            <Chip
                              clickable
                              {...(isSelected(item)
                                ? {}
                                : { variant: 'outlined' })}
                              color="primary"
                              size="small"
                              label={item}
                              onClick={handleChange}
                              className={classess.root}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                    <Grid item xs={12}>
                      <Box ml={2} mb={1}>
                        <Chip
                          clickable
                          {...(isSelected('Other')
                            ? {}
                            : { variant: 'outlined' })}
                          color="primary"
                          size="small"
                          label={'Other'}
                          onClick={hanldeChangeOther}
                          className={classess.root}
                        />
                      </Box>
                    </Grid>
                    {errors && <ErrorMsg name={'softSigns'} errors={errors} />}

                    <Grid item>
                      {other && (
                        <TextField
                          inputRef={
                            other
                              ? register({
                                  required: 'This field is required',
                                })
                              : register
                          }
                          InputLabelProps={{ shrink: true }}
                          name="other"
                          label="Other"
                          placeholder="Other"
                        />
                      )}
                      {errors && <ErrorMsg name={'other'} errors={errors} />}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box m={1}>
                  <BoxWrapper>
                    <Box flex="auto" display="flex">
                      <Box flex="auto" width={3 / 4}>
                        <InputLabel>Notes</InputLabel>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          name="notes"
                          multiline
                          rows="5"
                          fullWidth
                          onChange={handleChangeAvaibleCharts}
                          inputRef={register({
                            required: 'This field is required',
                          })}
                          placeholder="Please enter patient information at this point to indicate what that patient situation is."
                        />
                        {errors && <ErrorMsg name={'notes'} errors={errors} />}
                      </Box>
                      <Divider
                        variant="middle"
                        flexItem
                        orientation="vertical"
                      />
                      <Box flex="auto">
                        <Box>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={4}
                          >
                            <Grid item>
                              <Typography variant="button">{`${avaibleChars}/${MAX_CHARS_ISB_TABS}`}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </BoxWrapper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
      <BottomBar>
        <Button.Secondary variant="contained" form={`isbar-0`} type="submit">
          SAVE SITUATION
        </Button.Secondary>
      </BottomBar>
    </>
  );
};
(Situation as any).whyDidYouRender = {
  customName: 'Situation',
};
export { Situation };
