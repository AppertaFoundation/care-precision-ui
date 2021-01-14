import React from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
// import  from '../ErrorMsg/index';
import DeleteIcon from '@material-ui/icons/Delete';

const RADIO_OPTIONS = [
  {
    id: 'yes',
    value: 'Yes',
  },
  {
    id: 'no',
    value: 'No',
  },
];

interface IRadioGroup {
  values?: any;
  name: string;
  inputRef?: any;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  required?: string | boolean;
  device?: string;
  direction?: 'column' | 'row' | 'row-reverse' | 'column-reverse' | undefined;
  onChange?: any;
  register?: any;
  clear?: any;
}
const RadioGroupMUI: React.FC<IRadioGroup> = ({
  values,
  name,
  inputRef,
  label,
  disabled,
  defaultValue,
  required = 'This fill is required',
  device,
  direction = 'column',
  onChange,
  register,
  clear,
}) => {
  //   const { register, errors } = useFormContext();
  const [selection, setSelection] = React.useState({ [name]: defaultValue });

  const updateSelection = e => {
    e.persist();
    setSelection({ ...selection, [name]: e.target.value });
    if (onChange) {
      onChange({ ...selection, [name]: e.target.value });
    }
  };

  const options = values || RADIO_OPTIONS;
  const onClear = e => {
    setSelection({ ...selection, [name]: '' });
    clear();
  };
  return (
    <div className="App">
      <FormLabel component="legend">
        {label}
        {clear && (
          <IconButton size="small" onClick={onClear}>
            <DeleteIcon />
          </IconButton>
        )}
      </FormLabel>
      {device && (
        <Box color="warning.main">
          <Typography>⚠ Patient has {device}</Typography>
        </Box>
      )}
      <RadioGroup
        name={name}
        value={selection[name] || ''}
        onChange={updateSelection}
      >
        <Grid container direction={direction}>
          {options.map(({ value, id }) => (
            <Grid item key={id}>
              <Box mr={6}>
                <FormControlLabel
                  disabled={disabled}
                  label={value}
                  key={id}
                  value={id}
                  inputRef={register({ required })}
                  control={<Radio size="small" color="primary" />}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      {/* {errors && name && <ErrorMessage name={name} errors={errors} />} */}
    </div>
  );
};

export default RadioGroupMUI;
