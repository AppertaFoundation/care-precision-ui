import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';
import uniqid from 'uniqid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const NativeSelects: React.FC<{
  options: { value: string; label: string }[];
  label: string;
  name: string;
  defaultValue?: any;
  disabled?: boolean;
  control: any;
  rules?: any;
  id: string;
}> = ({ options, label, name, defaultValue, disabled, control, rules, id }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState<string | unknown>('');
  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    setValue(event.target.value);
  };
  return (
    <Controller
      as={
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <Select
            native
            value={value}
            onChange={handleChange}
            label={label}
            labelWidth={3}
            inputProps={{
              name: name,
              id: id,
              disabled: disabled,
            }}
          >
            <option aria-label="None" value="" />

            {options.map(({ value, label }) => (
              <option key={uniqid()} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormControl>
      }
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};
export default NativeSelects;
